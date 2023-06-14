import { useEffect, useMemo } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'

import { debounce } from 'lodash'

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

  const onUpdate = useMemo(
    () =>
      debounce(({ editor }) => {
        if (editor.isFocused) {
          const json = editor?.getJSON()
          submit(json)
        }
      }, 800),
    [note.id] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onBlur = () => {
    onUpdate.cancel()
    submit(editor?.getJSON())
  }

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
      Link.configure({
        protocols: ['ftp', 'mailto'],
        autolink: true,
        openOnClick: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: 'text-sky-400 underline',
        },
      }),
    ],
    content: note.content,
    onUpdate,
    onBlur,
    editorProps: {
      attributes: {
        class:
          'prose-gray h-full flex-1 prose-headings:font-semibold prose:leading-6 transition-colors marker:text-gray-400 text-gray-600 focus:outline-none prose-h1:text-2xl prose-h2:text-xl',
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
    <div className="mb-12 flex flex-1 flex-col">
      {editor && <EditorMenu editor={editor} />}
      <EditorContent id="note" className="mt-2 flex h-full flex-1 px-4 py-4" editor={editor} />
    </div>
  )
}
