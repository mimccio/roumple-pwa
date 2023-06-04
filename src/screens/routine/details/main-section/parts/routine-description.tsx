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
        console.log('save')
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
          'prose-gray min-h-[160px] flex-1 p-4 prose-headings:font-semibold prose:leading-6 transition-colors marker:text-gray-400 text-gray-600 focus:outline-none prose-h1:text-2xl prose-h2:text-xl',
      },
    },
  })

  useEffect(() => {
    editor?.commands.setContent(routine.description || '')
  }, [routine.description, routine.id, editor])

  return (
    <div className="group flex flex-wrap-reverse">
      <EditorContent id="description" className="-mx-4 flex flex-1 border-y border-gray-100" editor={editor} />

      {editor && <EditorMenu editor={editor} />}
    </div>
  )
}
