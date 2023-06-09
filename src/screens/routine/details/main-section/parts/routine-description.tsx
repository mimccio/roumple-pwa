import { useEffect, useMemo } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { debounce } from 'lodash'

import type { Routine } from '&/modules/routine/types'
import { useEditRoutineDescription } from '&/modules/routine/hooks'
import { EditorMenu } from '&/common/components/menus/editor-menu'
import './style.css'

interface Props {
  routine: Routine
}

export function RoutineDescription({ routine }: Props) {
  const { submit } = useEditRoutineDescription(routine)

  const onUpdate = useMemo(
    () =>
      debounce(({ editor }) => {
        const json = editor?.getJSON()
        submit(json)
      }, 800),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc',
          },
        },
      }),
      Placeholder.configure({
        emptyEditorClass: 'is-editor-empty',
        placeholder: 'description',
      }),
    ],
    content: routine.description,
    onUpdate,
    editorProps: {
      attributes: {
        class:
          'prose-gray min-h-[160px] flex-1 prose-headings:font-semibold prose:leading-6 transition-colors marker:text-gray-400 text-gray-600 focus:outline-none prose-h1:text-2xl prose-h2:text-xl',
      },
    },
  })

  useEffect(() => {
    editor?.commands.setContent(routine.description || '')
  }, [routine.id, editor]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="px-4">
      {editor && <EditorMenu editor={editor} />}
      <EditorContent id="description" className="flex flex-1 border-b border-gray-100 py-4" editor={editor} />
    </div>
  )
}
