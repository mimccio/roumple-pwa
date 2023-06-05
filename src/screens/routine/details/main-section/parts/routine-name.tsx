import { useEffect, Fragment } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { Extension } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import CharacterCount from '@tiptap/extension-character-count'

import type { Routine } from '&/modules/routine/types'
import { useEditRoutineName } from '&/modules/routine/hooks/use-edit-routine-name'
import { Transition } from '@headlessui/react'

interface Props {
  routine: Routine
}

const NAME_MAX_CHARS = 300

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
    extensions: [Document, Text, Paragraph, DisableEnter, CharacterCount.configure({ limit: NAME_MAX_CHARS })],
    content: routine.name,
    editorProps: {
      attributes: {
        class:
          'prose relative prose-gray py-2 font-semibold transition-colors rounded-lg prose-2xl mx-auto focus:outline-none ',
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

  const charNum = editor?.storage.characterCount.characters()

  return (
    <div className="relative px-4 pt-4">
      <EditorContent id={routine.id} onBlur={onBlur} editor={editor} />

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
