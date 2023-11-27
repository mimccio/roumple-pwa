import { useCallback, useEffect, useState } from 'react'
import type { RefObject, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Editor } from '@tiptap/react'
import { Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/solid'

import { cl } from '@/common/utils'

interface Props {
  isOpen: boolean
  onClose: () => void
  editor: Editor
  popperRef?: RefObject<HTMLDivElement>
}

export function LinkInput({ editor, isOpen, onClose, popperRef }: Props) {
  const { t } = useTranslation('common')
  const [url, setUrl] = useState<string>(editor.getAttributes('link').href || '')

  // Use clipboard text as default (works only on chrome)
  useEffect(() => {
    const getClipboardText = async () => {
      if (typeof navigator?.clipboard?.readText === 'function') {
        const text = await navigator.clipboard.readText()
        setUrl((prevUrl) => (prevUrl === '' ? text : prevUrl))
      }
    }
    getClipboardText()
  }, [])

  const setLink = useCallback(() => {
    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor, url])

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => setUrl(evt.currentTarget.value)
  const handleSubmit = (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setLink()
    onClose()
    setUrl('')
  }

  return (
    <Transition
      as="div"
      appear
      show={isOpen}
      className="absolute left-2 right-2 top-12 z-10 rounded-lg bg-gray-100 px-2 py-2 shadow-md"
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <div ref={popperRef} className="w-full">
        <form className="flex w-full flex-col gap-1" onSubmit={handleSubmit}>
          <label htmlFor="new-folder-element" className="ml-2 text-sm text-gray-400">
            {t('linkUrl')}
          </label>
          <div className="flex items-center gap-x-2">
            <input
              autoFocus
              id="new-folder-element"
              className="h-8 w-full rounded-md border border-transparent px-2 text-sm outline-none transition-colors placeholder:text-gray-300"
              placeholder="https://"
              value={url}
              onChange={handleChange}
            />
            <button
              disabled={!url.length}
              className={cl(
                'flex h-8 w-8 items-center justify-center rounded-md transition-colors',
                url.length >= 1 ? 'text-green-500 disabled:text-gray-300' : 'text-transparent'
              )}
              type="submit"
            >
              <CheckIcon width={24} height={24} />
            </button>
          </div>
        </form>
      </div>
    </Transition>
  )
}
