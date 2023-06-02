import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { Extension } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import CharacterCount from '@tiptap/extension-character-count'

import type { Routine } from '&/modules/routine/types'
import { useEditRoutineName } from '&/modules/routine/hooks/use-edit-routine-name'

interface Props {
  routine: Routine
}

const DisableEnter = Extension.create({
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => editor?.commands.blur(),
    }
  },
})

export function RoutineName({ routine }: Props) {
  const { submit } = useEditRoutineName(routine)
  const editor = useEditor({
    extensions: [Document, Text, Paragraph, DisableEnter, CharacterCount.configure({ limit: 300 })],
    content: routine.name,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose prose-gray text-lg font-semibold transition-colors rounded-lg lg:prose-lg xl:prose-2xl mx-auto focus:outline-none ',
      },
    },
  })

  useEffect(() => {
    editor?.commands.setContent(routine.name)
  }, [routine.name, routine.id, editor])

  const onBlur = () => {
    const text = editor?.getText().trim() || ''
    if (text === routine.name) return
    submit(text)
  }

  return (
    <div className="">
      <EditorContent id={routine.id} style={{ whiteSpace: 'nowrap' }} onBlur={onBlur} editor={editor} />
    </div>
  )
}
