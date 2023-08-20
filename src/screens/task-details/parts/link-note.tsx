import { useRef, useState, ChangeEvent, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { DocumentTextIcon } from '@heroicons/react/24/outline'

import { useOutsideClick } from '&/common/hooks'
import { ListSkeletonSmall } from '&/common/components/list-skeleton-small'

import type { Note } from '&/modules/note/types'
import { useSearchNote } from '&/modules/note/hooks'
import { useCreateTaskNote } from '&/modules/task-note/hooks'

interface Props {
  isOpen: boolean
  close: () => void
}

export function LinkNote({ isOpen = true, close }: Props) {
  const { t } = useTranslation(['action', 'note'])
  const ref = useRef<HTMLFormElement>(null)
  const [searchText, setSearchText] = useState<string>('')
  const { notes, isLoading, onSearchSubmit } = useSearchNote()
  const { onCreate } = useCreateTaskNote()

  const handleTextChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault()
    setSearchText(evt.currentTarget.value)
  }

  useOutsideClick({ ref, handler: close })

  const onSearch = (evt: FormEvent<HTMLElement>) => {
    evt.preventDefault()
    onSearchSubmit(searchText)
    // setSearchText('')
  }

  const onSelect = (note: Note) => onCreate(note)

  return (
    <Transition
      ref={ref}
      show={isOpen}
      className="absolute left-4 right-4 top-16 z-20 flex min-h-[250px] flex-col gap-4 rounded-md border bg-white p-2 shadow-md"
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <form className="flex items-center gap-x-2" onSubmit={onSearch}>
        <input
          className="w-full rounded-md bg-gray-100 px-2 py-2 text-gray-600 outline-none placeholder:text-sm"
          value={searchText}
          onChange={handleTextChange}
          placeholder={t('searchNote', { ns: 'note' })}
        />
        <button
          className="flex items-center justify-center rounded-md bg-gray-100 p-2 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-500"
          type="submit"
        >
          <MagnifyingGlassIcon height={16} />
        </button>
      </form>
      <div className="flex flex-1 flex-col gap-y-2">
        {isLoading && <ListSkeletonSmall />}
        {!notes?.length && <p className="text-xs text-gray-300">No notes to show</p>}
        {notes?.map((note) => (
          <button
            onClick={() => onSelect(note)}
            key={note.id}
            className="group flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-600"
          >
            <DocumentTextIcon width={14} className="text-gray-400 transition-colors group-hover:text-gray-500" />{' '}
            {note.title}
          </button>
        ))}
      </div>
      <div className="items-self-end">
        <button onClick={close} className="rounded-md border px-2 py-1 text-xs text-gray-500">
          {t('close', { ns: 'action' })}
        </button>
      </div>
    </Transition>
  )
}
