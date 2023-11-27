import { EditorContent } from '@tiptap/react'
import type { JSONContent } from '@tiptap/react'

import { cl } from '@/common/utils'
import { useDocumentEditor } from './use-document-editor'
import { EditorMenu } from './editor-menu'
import './style.css'

interface Props {
  content?: JSONContent
  id: string
  submit: (json?: JSONContent | undefined) => void
  forceTitle?: boolean
  bt?: boolean
}

export function DocumentEditor({ id, content, submit, forceTitle, bt = false }: Props) {
  const { editor } = useDocumentEditor({ id, content, submit, forceTitle })

  return (
    <div className={cl('flex flex-1 flex-col border-b border-gray-200 bg-gray-50', bt && 'border-t ')}>
      {editor && <EditorMenu editor={editor} />}
      <div className="mx-auto w-full max-w-5xl">
        <EditorContent id="note" className="flex h-full flex-1 p-4" editor={editor} />
      </div>
    </div>
  )
}
