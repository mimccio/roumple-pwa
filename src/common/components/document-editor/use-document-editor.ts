import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEditor } from '@tiptap/react'
import type { JSONContent } from '@tiptap/react'

import Document from '@tiptap/extension-document'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import { debounce } from 'lodash'
import { EditorState } from 'prosemirror-state'
import { getUrl } from '&/common/utils'

interface Params {
  submit: (json?: JSONContent | undefined) => void
  content?: JSONContent
  id: string
  forceTitle?: boolean
  placeholder?: string
}

export function useDocumentEditor({ submit, content, id, forceTitle, placeholder = 'description' }: Params) {
  const navigate = useNavigate()
  const [refreshLink, setRefreshLink] = useState(0)
  const CustomDocument = forceTitle ? Document.extend({ content: 'heading block*' }) : Document

  const onUpdate = useMemo(
    () =>
      debounce(({ editor }) => {
        setRefreshLink((prev) => prev + 1)
        if (editor.isFocused) {
          const json = editor?.getJSON()
          submit(json)
        }
      }, 500),
    [id] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onBlur = () => {
    onUpdate.cancel()
    submit(editor?.getJSON())
  }

  const editor = useEditor({
    autofocus: 'end',
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,

        bulletList: {
          HTMLAttributes: {
            class: 'list-disc',
          },
        },

        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal',
          },
        },
      }),
      Placeholder.configure({
        emptyEditorClass: 'is-editor-empty',
        placeholder: ({ node, pos }) => {
          if (pos > 0) return ''
          if (node.type.name === 'heading' && forceTitle) return 'title'
          return placeholder
        },
      }),
      Link.configure({
        // protocols: ['ftp', 'mailto'],
        // autolink: true,
        openOnClick: false,
        linkOnPaste: true,
        HTMLAttributes: {
          target: null,
          rel: null,
          class: 'tiptap-link',
        },
      }),
    ],
    content: content,
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
    if (!editor) return
    editor.commands.setContent(content || null)
    // The following code clears the history. Hopefully without side effects.
    const newEditorState = EditorState.create({
      doc: editor.state.doc,
      plugins: editor.state.plugins,
      schema: editor.state.schema,
      selection: editor.state.selection,
    })
    editor.view.updateState(newEditorState)
  }, [id, editor]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.querySelectorAll<HTMLElement>('a.tiptap-link').forEach((a) => {
      const href = a.getAttribute('href')
      if (!href) return
      const { url, isRoumple } = getUrl(href)
      const handleClick = (evt: MouseEvent) => {
        evt.preventDefault()
        if (isRoumple) {
          navigate(url.pathname)
        } else {
          window.open(href, '_blank')
        }
      }
      a.addEventListener('click', handleClick)
      return () => a.removeEventListener('click', handleClick)
    })
  }, [navigate, id, editor, refreshLink])

  // useEffect(() => {
  //   editor?.commands.focus('end')
  // }, [note.id, editor])

  return { editor }
}
