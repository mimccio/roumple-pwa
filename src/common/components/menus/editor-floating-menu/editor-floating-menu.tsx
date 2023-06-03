import { Editor, FloatingMenu } from '@tiptap/react'
import { FloatingMenuButton } from './parts/floating-menu-button'
import { H1Icon } from '&/common/components/icons/h1'
import { H2Icon } from '&/common/components/icons/h2'
import { UnorderedListIcon } from '&/common/components/icons/unordered-list'

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
        Icon={H1Icon}
        isActive={editor.isActive('heading', { level: 1 })}
        handleClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      />

      <FloatingMenuButton
        Icon={H2Icon}
        isActive={editor.isActive('heading', { level: 2 })}
        handleClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      />

      <FloatingMenuButton
        Icon={UnorderedListIcon}
        isActive={editor.isActive('bulletList')}
        handleClick={() => editor.chain().focus().toggleBulletList().run()}
      />
    </FloatingMenu>
  )
}
