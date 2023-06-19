import { useEffect, Fragment } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { Extension } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import CharacterCount from '@tiptap/extension-character-count'
import { Transition } from '@headlessui/react'

interface Props {
  name: string
  id: string
  submit: (text: string) => void
}

const NAME_MAX_CHARS = 300

const DisableEnter = Extension.create({
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => editor?.commands.blur(),
    }
  },
})

export function NameEditor({ name, id, submit }: Props) {
  const editor = useEditor({
    extensions: [Document, Text, Paragraph, DisableEnter, CharacterCount.configure({ limit: NAME_MAX_CHARS })],
    content: name,
    editorProps: {
      attributes: {
        class:
          'prose relative prose-gray py-2 font-semibold transition-colors rounded-lg prose-2xl mx-auto focus:outline-none ',
      },
    },
  })

  useEffect(() => {
    editor?.commands.setContent(name)
  }, [name, id, editor])

  const onBlur = () => {
    const text = editor?.getText().trim() || ''
    if (text === name) return
    submit(text)
  }

  const charNum = editor?.storage.characterCount.characters()

  return (
    <div className="relative px-4 pt-2">
      <EditorContent id={id} onBlur={onBlur} editor={editor} />

      <Transition
        show={charNum >= 300}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <p className="absolute bottom-0 right-0 z-10 text-xs text-red-400">max {NAME_MAX_CHARS} characters</p>
      </Transition>
    </div>
  )
}
