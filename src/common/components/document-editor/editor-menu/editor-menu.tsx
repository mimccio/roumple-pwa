import { Editor } from '@tiptap/react'
import { LinkIcon } from '@heroicons/react/20/solid'

import { usePopper } from '&/common/hooks'
import { H1Icon } from '&/common/components/icons/h1'
import { H2Icon } from '&/common/components/icons/h2'
import { OrderedListIcon } from '&/common/components/icons/ordered-list'
import { UnorderedListIcon } from '&/common/components/icons/unordered-list'
import { BoldIcon } from '&/common/components/icons/bold'
import { ItalicIcon } from '&/common/components/icons/italic'
import { Strikethrough } from '&/common/components/icons/strikethrough'
import { EditorMenuButton } from './editor-menu-button'
import { LinkInput } from './link-input'
import { TaskListIcon } from '../../icons/task-list'

interface Props {
  editor: Editor
}

export function EditorMenu({ editor }: Props) {
  const { toggle, isOpen, popperRef, buttonRef, close } = usePopper()

  const onLinkClick = () => {
    if (editor?.isActive('link')) {
      editor.chain().focus().unsetLink().run()
      return
    }
    toggle()
  }

  return (
    <div className="relative">
      <div className="flex flex-wrap justify-center gap-1 border-b border-gray-100 py-1">
        <input id="focusdummy" className="opacity:0 w-0 outline-none" />
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
          Icon={OrderedListIcon}
          isActive={editor.isActive('orderedList')}
          handleClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <EditorMenuButton
          Icon={TaskListIcon}
          isActive={editor.isActive('taskList')}
          handleClick={() => editor.chain().focus().toggleTaskList().run()}
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

        <EditorMenuButton
          buttonRef={buttonRef}
          Icon={LinkIcon}
          isActive={editor?.isActive('link')}
          handleClick={onLinkClick}
        />
      </div>
      <LinkInput isOpen={isOpen} editor={editor} onClose={close} popperRef={popperRef} />
    </div>
  )
}
