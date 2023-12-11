import { Fragment, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Transition } from '@headlessui/react'
import { Extension } from '@tiptap/core'
import CharacterCount from '@tiptap/extension-character-count'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import { toast } from 'react-hot-toast'

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
  const { t } = useTranslation(['common', 'error'])

  const editor = useEditor({
    extensions: [Document, Text, Paragraph, DisableEnter, CharacterCount.configure({ limit: NAME_MAX_CHARS })],
    content: name,
    editorProps: {
      attributes: {
        class:
          'prose relative prose-gray py-2 font-semibold transition-colors rounded-lg prose-2xl dark:prose-invert focus:outline-none',
      },
    },
  })

  useEffect(() => {
    editor?.commands.setContent(name)
  }, [name, id, editor])

  const onBlur = () => {
    const text = editor?.getText().trim() || ''
    if (!text.length) {
      editor?.commands.setContent(name)
      toast.error(t('emptyName'))
      return
    }
    if (text === name) return
    submit(text)
  }

  const charNum = editor?.storage.characterCount.characters()

  return (
    <div className="relative bg-gray-50">
      <span className="absolute bottom-1 right-2 text-xs lowercase text-gray-300">{t('name', { ns: 'common' })}</span>
      <div className="relative mx-auto flex min-h-[64px] w-full max-w-5xl items-center px-4 py-1">
        <EditorContent className="inline-block w-full" id={id} onBlur={onBlur} editor={editor} />

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
          <p className="absolute bottom-0 right-0 z-10 pr-2 text-xs text-red-400">
            {t('maxChars', { ns: 'error', maxChars: NAME_MAX_CHARS })}
          </p>
        </Transition>
      </div>
    </div>
  )
}
