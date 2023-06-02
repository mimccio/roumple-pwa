import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import BulletList from '@tiptap/extension-bullet-list'

import './style.css'

import type { Routine } from '&/modules/routine/types'
import { useEditRoutineName } from '&/modules/routine/hooks/use-edit-routine-name'
import { EditorFloatingMenu } from '&/common/components/menus/editor-floating-menu'
import { EditorBubbleMenu } from '&/common/components/menus/editor-bubble-menu'

interface Props {
  routine: Routine
}

export function RoutineDescription({ routine }: Props) {
  const { submit } = useEditRoutineName(routine)
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        emptyEditorClass: 'is-editor-empty',
        placeholder: 'description',
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc',
        },
      }),
    ],
    content: routine.description,
    editorProps: {
      attributes: {
        class:
          'prose-gray border min-h-[200px] prose-headings:font-semibold transition-colors rounded-lg marker:text-gray-400 text-gray-600 focus:outline-none prose-h1:text-2xl prose-h2:text-xl ',
      },
    },
  })

  useEffect(() => {
    editor?.commands.setContent(routine.description || '')
  }, [routine.description, routine.id, editor])

  const onBlur = () => {
    const json = editor?.getJSON()
    console.log('json :', json)
    // if (text === routine.description) return
    // submit(text)
  }

  return (
    <div className="">
      {editor && <EditorBubbleMenu editor={editor} />}
      {editor && <EditorFloatingMenu editor={editor} />}
      <EditorContent onBlur={onBlur} editor={editor} />
    </div>
  )
}
