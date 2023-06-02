import { Editor, BubbleMenu } from '@tiptap/react'
import { FloatingMenuButton } from './parts/floating-menu-button'
import { BoldIcon } from '&/common/components/icons/bold'
import { ItalicIcon } from '&/common/components/icons/italic'
import { Strikethrough } from '&/common/components/icons/strikethrough'

interface Props {
  editor: Editor
}

export function EditorBubbleMenu({ editor }: Props) {
  return (
    <BubbleMenu
      className="ml-4 flex items-center gap-2 rounded-md bg-gray-200 px-2 py-1 text-sm text-gray-600 shadow-md"
      tippyOptions={{ duration: 100 }}
      editor={editor}
    >
      <FloatingMenuButton
        Icon={BoldIcon}
        isActive={editor.isActive('bold')}
        handleClick={() => editor.chain().focus().toggleBold().run()}
      />

      <FloatingMenuButton
        Icon={ItalicIcon}
        isActive={editor.isActive('italic')}
        handleClick={() => editor.chain().focus().toggleItalic().run()}
      />
      <FloatingMenuButton
        Icon={Strikethrough}
        isActive={editor.isActive('strike')}
        handleClick={() => editor.chain().focus().toggleStrike().run()}
      />
    </BubbleMenu>
  )
}
