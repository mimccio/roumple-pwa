import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
// import { debounce } from 'lodash'

import { EditorMenu } from '&/common/components/menus/editor-menu'
import type { Note } from '&/modules/note/types'
import './style.css'
import { useEditNoteContent } from '&/modules/note/hooks/use-edit-note-content'

interface Props {
  note: Note
}

const CustomDocument = Document.extend({
  content: 'heading block*',
})

export function NoteEditor({ note }: Props) {
  const { submit } = useEditNoteContent(note)

  // const onUpdate = useMemo(
  //   () =>
  //     debounce(({ editor }) => {
  //       console.log('editor.isFocused :', editor.isFocused)
  //       if (editor.isFocused) {
  //         const json = editor?.getJSON()
  //         submit(json)
  //       }
  //     }, 800),
  //   [note.id] // eslint-disable-line react-hooks/exhaustive-deps
  // )

  const editor = useEditor({
    // autofocus: 'end',
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,

        bulletList: {
          HTMLAttributes: {
            class: 'list-disc',
          },
        },
      }),

      Placeholder.configure({
        emptyEditorClass: 'is-editor-empty',
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') return 'Title'
          return ''
        },
      }),
    ],
    content: note.content,
    // onUpdate,
    onBlur: () => submit(editor?.getJSON()),
    editorProps: {
      attributes: {
        class:
          'prose-gray min-h-[160px] flex-1 prose-headings:font-semibold prose:leading-6 transition-colors marker:text-gray-400 text-gray-600 focus:outline-none prose-h1:text-2xl prose-h2:text-xl',
      },
    },
  })

  useEffect(() => {
    editor?.commands.setContent(note.content || null)
  }, [note.id, editor]) // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  // editor?.commands.focus('end')
  // }, [note.id, editor])

  return (
    <div className="px-4">
      {editor && <EditorMenu editor={editor} />}
      <EditorContent id="note" className="mt-2 flex flex-1 border-b border-gray-100 py-4" editor={editor} />
    </div>
  )
}
