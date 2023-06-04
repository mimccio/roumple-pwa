import { Editor } from '@tiptap/react'
import { H1Icon } from '&/common/components/icons/h1'
import { H2Icon } from '&/common/components/icons/h2'
import { UnorderedListIcon } from '&/common/components/icons/unordered-list'
import { EditorMenuButton } from './editor-menu-button'
import { BoldIcon } from '&/common/components/icons/bold'
import { ItalicIcon } from '&/common/components/icons/italic'
import { Strikethrough } from '&/common/components/icons/strikethrough'

interface Props {
  editor: Editor
}

export function EditorMenu({ editor }: Props) {
  return (
    <div className="-mr-4 flex flex-col justify-start gap-1 bg-gray-100 p-1">
      <EditorMenuButton
        Icon={H1Icon}
        isActive={editor.isActive('heading', { level: 1 })}
        handleClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      />

      <EditorMenuButton
        Icon={H2Icon}
        isActive={editor.isActive('heading', { level: 2 })}
        handleClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      />

      <EditorMenuButton
        Icon={UnorderedListIcon}
        isActive={editor.isActive('bulletList')}
        handleClick={() => editor.chain().focus().toggleBulletList().run()}
      />
      <EditorMenuButton
        Icon={BoldIcon}
        isActive={editor?.isActive('bold')}
        handleClick={() => editor?.chain().focus().toggleBold().run()}
      />

      <EditorMenuButton
        Icon={ItalicIcon}
        isActive={editor?.isActive('italic')}
        handleClick={() => editor?.chain().focus().toggleItalic().run()}
      />
      <EditorMenuButton
        Icon={Strikethrough}
        isActive={editor?.isActive('strike')}
        handleClick={() => editor?.chain().focus().toggleStrike().run()}
      />
    </div>
  )
}
