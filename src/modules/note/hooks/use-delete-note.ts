import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { useMainPath } from '&/common/hooks'

import type { NoteFolder } from '&/modules/note-folder/types'
import type { RoutineNoteByRoutine } from '&/modules/routine-note/types'
import type { Note } from '../types'

import { NOTE_FOLDER_KEYS } from '&/modules/note-folder/constants'
import { ROUTINE_NOTE_KEYS } from '&/modules/routine-note/constants'
import { NOTE_KEYS } from '../constants'

import { deleteNote } from '../mutations'

export function useDeleteNote() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const mainPath = useMainPath()

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onMutate: async (data) => {
      // ✖️ Cancel related queries
      await Promise.all([
        queryClient.cancelQueries({ queryKey: NOTE_KEYS.detail(data.id) }),
        queryClient.cancelQueries({ queryKey: NOTE_KEYS.list({ folderId: data.folder?.id }) }),
        queryClient.cancelQueries({ queryKey: NOTE_KEYS.searches() }),
        queryClient.cancelQueries({ queryKey: NOTE_FOLDER_KEYS.list({ categoryId: undefined }) }),
        queryClient.cancelQueries({ queryKey: NOTE_FOLDER_KEYS.list({ categoryId: data.category?.id }) }),
        queryClient.cancelQueries({ queryKey: ROUTINE_NOTE_KEYS.byRoutineLists() }),
        queryClient.cancelQueries({ queryKey: ROUTINE_NOTE_KEYS.note(data.id) }),
      ])

      // ⛳ Update Note
      queryClient.setQueryData(NOTE_KEYS.detail(data.id), () => null)

      // 🗃️ Update Note list
      const previousNoteList = queryClient.getQueryData(NOTE_KEYS.list({ folderId: data.folder?.id }))
      queryClient.setQueryData(NOTE_KEYS.list({ folderId: data.folder?.id }), (old: Note[] = []) => {
        const noteIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, noteIndex), ...old.slice(noteIndex + 1)]
      })

      // 🗃️ Update Note search lists
      queryClient.setQueriesData({ queryKey: NOTE_KEYS.searches() }, (old?: Note[]) =>
        old?.filter((item) => item.id !== data.id)
      )

      // 🗃️ Update NoteFolder list all category
      const previousFolderListAllCategory = queryClient.getQueryData(NOTE_FOLDER_KEYS.list({ categoryId: undefined }))
      queryClient.setQueryData(NOTE_FOLDER_KEYS.list({ categoryId: undefined }), (old: NoteFolder[] = []) => {
        const folderIndex = old.findIndex((item) => item.id === data.folder?.id)
        if (folderIndex < 0) return old
        const oldFolder = old[folderIndex]
        const count = (oldFolder.noteCount?.[0].count || 1) - 1
        const newFolder = { ...oldFolder, noteCount: [{ count }] }
        return [...old.slice(0, folderIndex), newFolder, ...old.slice(folderIndex + 1)]
      })

      // 🗃️ Update NoteFolder list selected category
      const previousFolderListCategoryId = queryClient.getQueryData(
        NOTE_FOLDER_KEYS.list({ categoryId: data.category?.id })
      )
      queryClient.setQueryData(NOTE_FOLDER_KEYS.list({ categoryId: data.category?.id }), (old: NoteFolder[] = []) => {
        if (!data.category?.id) return old
        const folderIndex = old.findIndex((item) => item.id === data.folder?.id)
        if (folderIndex < 0) return old
        const oldFolder = old[folderIndex]
        const count = (oldFolder.noteCount?.[0].count || 1) - 1
        const newFolder = { ...oldFolder, noteCount: [{ count }] }
        return [...old.slice(0, folderIndex), newFolder, ...old.slice(folderIndex + 1)]
      })

      // 🗃️ Update RoutineNote by routine lists
      queryClient.setQueriesData({ queryKey: ROUTINE_NOTE_KEYS.byRoutineLists() }, (old?: RoutineNoteByRoutine[]) =>
        old?.map((item) => (item.note.id === data.id ? { ...item, deleted: true } : item))
      )

      navigate(mainPath)
      return {
        previousNoteList,
        previousFolderListAllCategory,
        previousFolderListCategoryId,
      }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData(NOTE_KEYS.detail(item.id), item)
      queryClient.setQueryData(NOTE_KEYS.list({ folderId: item.folder?.id }), context?.previousNoteList)
      queryClient.setQueryData(NOTE_FOLDER_KEYS.list({ categoryId: undefined }), context?.previousFolderListAllCategory)
      queryClient.setQueryData(
        NOTE_FOLDER_KEYS.list({ categoryId: item.category?.id }),
        context?.previousFolderListCategoryId
      )
      queryClient.setQueriesData({ queryKey: ROUTINE_NOTE_KEYS.byRoutineLists() }, (old?: RoutineNoteByRoutine[]) =>
        old?.map((routineNote) => (routineNote.note.id === item.id ? { ...routineNote, deleted: false } : routineNote))
      )
      queryClient.setQueriesData({ queryKey: NOTE_KEYS.searches() }, (old?: Note[]) => (old ? [...old, item] : [item])) // TODO?: order
      toast.error("Deletion didn't work")
    },
    onSettled: async (_data, _error, note) => {
      queryClient.invalidateQueries({ queryKey: NOTE_KEYS.detail(note.id) })
      queryClient.invalidateQueries({ queryKey: NOTE_KEYS.list({ folderId: note.folder?.id }) })
      queryClient.invalidateQueries({ queryKey: NOTE_FOLDER_KEYS.list({ categoryId: undefined }) })
      queryClient.invalidateQueries({ queryKey: NOTE_FOLDER_KEYS.list({ categoryId: note.category?.id }) })
      queryClient.invalidateQueries({ queryKey: ROUTINE_NOTE_KEYS.byRoutineLists() })
      queryClient.invalidateQueries({ queryKey: NOTE_KEYS.searches() })
      queryClient.removeQueries({ queryKey: NOTE_KEYS.detail(note.id) })
      queryClient.removeQueries({ queryKey: ROUTINE_NOTE_KEYS.note(note.id) })
    },
  })

  const onDelete = (note: Note) => mutate(note)
  return { onDelete }
}
