import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

import './style.css'

import type { Routine } from '&/modules/routine/types'
import { EditorFloatingMenu } from '&/common/components/menus/editor-floating-menu'
import { EditorBubbleMenu } from '&/common/components/menus/editor-bubble-menu'
import { useEditRoutineDescription } from '&/modules/routine/hooks'
import { isEqual } from 'lodash'

interface Props {
  routine: Routine
}

export function RoutineDescription({ routine }: Props) {
  const { submit } = useEditRoutineDescription(routine)
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
    editorProps: {
      attributes: {
        class:
          'prose-gray min-h-[120px] prose-headings:font-semibold transition-colors rounded-lg marker:text-gray-400 text-gray-600 focus:outline-none prose-h1:text-2xl prose-h2:text-xl ',
      },
    },
  })

  useEffect(() => {
    editor?.commands.setContent(routine.description || '')
  }, [routine.description, routine.id, editor])

  const onBlur = () => {
    const json = editor?.getJSON()
    if (!json || isEqual(routine.description, json)) return
    submit(json)
  }

  return (
    <div className="">
      {editor && <EditorBubbleMenu editor={editor} />}
      {editor && <EditorFloatingMenu editor={editor} />}
      <EditorContent onBlur={onBlur} editor={editor} />
    </div>
  )
}
