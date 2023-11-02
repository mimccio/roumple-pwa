import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { DocumentTextIcon, ExclamationTriangleIcon, SignalSlashIcon } from '@heroicons/react/24/outline'

import { cl } from '&/common/utils'
import { useOutsideClick } from '&/common/hooks'
import { ListSkeletonSmall } from '&/common/components/skeletons'
import { DotSpinner } from '&/common/components/spinners'

import { useGetSearchNote } from '&/modules/note/hooks'
import type { Note } from '&/modules/note/types'

interface Props {
  isOpen: boolean
  close: () => void
  onLinkNote: (note: Note) => void
}

export function LinkNote({ isOpen, close, onLinkNote }: Props) {
  const { t } = useTranslation(['action', 'note'])
  const ref = useRef<HTMLFormElement>(null)
  const { notes, onSearchSubmit, value, handleTextChange, isLoading, isError, isPaused, isFetching, reset } =
    useGetSearchNote()

  useOutsideClick({
    ref,
    handler: () => {
      close()
      reset()
    },
  })

  return (
    <Transition
      ref={ref}
      show={isOpen}
      className="absolute left-4 right-4 top-16 z-20 flex min-h-[300px] flex-col gap-4 rounded-md border bg-white p-2 shadow-md"
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <form className="flex items-center gap-x-2" onSubmit={onSearchSubmit}>
        <input
          className="w-full rounded-md bg-gray-100 px-2 py-2 text-gray-600 outline-none placeholder:text-sm"
          value={value}
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
        {isLoading && !isPaused && <ListSkeletonSmall count={3} />}
        {isPaused && !notes?.length && (
          <p className="flex items-center justify-center gap-x-2 text-xs text-orange-300">
            <SignalSlashIcon className="w-3" />
            {t('Offline, no note to show', { ns: 'note' })}
          </p>
        )}

        {isError && (
          <p className="flex items-center justify-center gap-x-2 text-xs text-red-300">
            <ExclamationTriangleIcon className="w-3" />
            {t('Error fetching notes', { ns: 'note' })}
          </p>
        )}
        {!isError && !notes?.length && !isPaused && !isLoading && (
          <p className="flex items-center justify-center gap-x-2 text-xs text-gray-300">
            <DocumentTextIcon className="w-3" />
            {t('noNoteToShow', { ns: 'note' })}
          </p>
        )}
        <div className="absolute bottom-4 right-4">
          <DotSpinner show={isFetching && !isLoading} />
        </div>

        {notes?.map((note) => (
          <button
            onClick={() => onLinkNote(note)}
            key={note.id}
            className={cl(
              'group flex items-center gap-2 text-sm transition-colors',
              note.title ? 'text-gray-500 hover:text-gray-600' : 'text-gray-300 hover:text-gray-400'
            )}
          >
            <DocumentTextIcon width={16} className="text-gray-400 transition-colors group-hover:text-gray-500" />{' '}
            {note.title || 'no name'}
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
