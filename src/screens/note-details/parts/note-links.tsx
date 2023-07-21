import { useTranslation } from 'react-i18next'
import { LinkIcon } from '@heroicons/react/24/solid'
import type { Note } from '&/modules/note/types'

interface Props {
  note: Note
}

export function NoteLinks({ note }: Props) {
  const { t } = useTranslation('note')
  const numberOfRoutines = note.routineNotes?.length
  if (!numberOfRoutines || numberOfRoutines === 0) return null
  const routineText = numberOfRoutines > 1 ? 'routines' : 'routine'

  return (
    <>
      <p className="flex items-center gap-x-3 py-1.5 text-sm text-gray-400">
        <LinkIcon height={16} width={16} className="text-gray-300" />
        {t('linkedTo')} {numberOfRoutines} {routineText}
      </p>
    </>
  )
}
