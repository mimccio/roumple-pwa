import { Editor, FloatingMenu } from '@tiptap/react'
import { FloatingMenuButton } from './parts/floating-menu-button'

interface Props {
  editor: Editor
}

export function EditorFloatingMenu({ editor }: Props) {
  return (
    <FloatingMenu
      className="ml-4 flex items-center gap-2 rounded-md bg-gray-200 px-2 py-1 text-sm text-gray-600 shadow-md"
      tippyOptions={{ duration: 100 }}
      editor={editor}
    >
      <FloatingMenuButton
        isActive={editor.isActive('heading', { level: 1 })}
        handleClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        h1
      </FloatingMenuButton>
      <FloatingMenuButton
        isActive={editor.isActive('heading', { level: 2 })}
        handleClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        h2
      </FloatingMenuButton>
      <FloatingMenuButton
        isActive={editor.isActive('bulletList')}
        handleClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <span className="block h-2 w-2 rounded-full bg-gray-500" />
      </FloatingMenuButton>
    </FloatingMenu>
  )
}
