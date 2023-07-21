import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FolderOpenIcon } from '@heroicons/react/24/outline'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { CheckIcon } from '@heroicons/react/24/solid'

import { cl } from '&/common/utils'
import { ConfirmDeleteModale } from '&/common/components/modales/confirm-delete-modale'
import type { NoteFolder } from '&/modules/note-folder/types'
import { useEditNoteFolder, useDeleteNoteFolder } from '&/modules/note-folder/hooks'
import { FolderMenu } from './folder-menu'

interface Props {
  folder: NoteFolder
}

export function FolderTitle({ folder }: Props) {
  const { t } = useTranslation('note')
  const { register, errors, submit, ref, name, onRename, isEditing } = useEditNoteFolder(folder)
  const { onDelete, isOpen, openDeleteModale, closeDeleteModale } = useDeleteNoteFolder(folder)

  if (isEditing)
    return (
      <div className="w-full px-2">
        <div className="flex items-center gap-4">
          <form ref={ref} className="flex w-full items-center gap-4" onSubmit={submit} onBlur={submit}>
            <input
              autoFocus
              id="new-folder-element"
              className="h-8 w-full rounded-md border border-transparent px-2 text-sm outline-none transition-colors hover:bg-gray-50 focus:bg-gray-100"
              placeholder={t('newFolder')}
              {...register('name', {
                required: { value: true, message: 'required' },
                maxLength: { value: 50, message: 'max 50' },
              })}
            />
            <button
              disabled={!name.length}
              className={cl(
                'flex h-8 w-8 items-center justify-center rounded-md transition-colors',
                name.length >= 1 ? 'text-green-500 disabled:text-gray-300' : 'text-transparent'
              )}
              type="submit"
            >
              <CheckIcon width={24} height={24} />
            </button>
          </form>
        </div>
        <div className="ml-14 flex h-4 justify-end px-4 text-xs text-red-400">
          {errors?.name && <p>{errors?.name.message}</p>}
        </div>
      </div>
    )

  return (
    <div className="flex items-center px-4">
      <Link to="/notes" className="group flex flex-1 items-center gap-x-4 py-2">
        <ChevronLeftIcon width={18} className="text-gray-300 transition-colors  group-hover:text-gray-500" />
        <FolderOpenIcon width={20} className="text-gray-400 transition-colors group-hover:text-gray-300" />
        <span className="font-semibold text-gray-500 transition-colors  group-hover:text-gray-400">{folder?.name}</span>
      </Link>
      <FolderMenu onDelete={openDeleteModale} onRename={onRename} />
      <ConfirmDeleteModale
        isOpen={isOpen}
        close={closeDeleteModale}
        onDelete={onDelete}
        title={t('deleteFolder')}
        description={t('confirmDeleteFolder')}
      />
    </div>
  )
}
