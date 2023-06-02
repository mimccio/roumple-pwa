import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { Extension } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'

interface Props {
  id: string
  name: string
  submit: (text: string) => void
  placeholder?: string
}

const DisableEnter = Extension.create({
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => editor?.commands.blur(),
    }
  },
})

export function NameEditor({ id, name, submit, placeholder = '' }: Props) {
  const editor = useEditor({
    extensions: [
      Document,
      Text,
      Paragraph,
      DisableEnter,
      CharacterCount.configure({ limit: 300 }),
      Placeholder.configure({
        emptyEditorClass: 'is-editor-empty',
        placeholder: placeholder,
      }),
    ],
    content: name,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose prose-gray text-lg font-semibold transition-colors rounded-lg lg:prose-lg xl:prose-2xl mx-auto focus:outline-none ',
      },
    },
  })

  useEffect(() => {
    editor?.commands.setContent(name)
  }, [id, name, editor])

  const onBlur = () => {
    const text = editor?.getText().trim() || ''
    if (text === name) return
    submit(text)
  }

  return <EditorContent id={id} style={{ whiteSpace: 'nowrap' }} onBlur={onBlur} editor={editor} />
}
