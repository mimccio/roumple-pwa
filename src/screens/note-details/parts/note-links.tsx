import { useTranslation } from 'react-i18next'
import { LinkIcon } from '@heroicons/react/24/solid'
import type { Note } from '&/modules/note/types'

interface Props {
  note: Note
}

export function NoteLinks({ note }: Props) {
  const { t } = useTranslation(['common', 'note'])
  const routineCount = note.routineNotes?.length || 0
  const taskCount = note.taskNotes?.length || 0

  if (!routineCount && !taskCount) return null

  const getText = () => {
    if (routineCount > 0 && taskCount > 0) {
      return `${t('routineNumber', { ns: 'note', count: routineCount })} ${t('and', { ns: 'note' })} ${t('taskNumber', {
        ns: 'note',
        count: taskCount,
      })}`
    }
    if (routineCount > 0) {
      return t('routineNumber', { ns: 'note', count: routineCount })
    }
    if (taskCount > 0) {
      return t('taskNumber', { ns: 'note', count: taskCount })
    }
  }

  return (
    <>
      <p className="flex items-center gap-x-3 py-1.5 text-sm text-gray-400">
        <LinkIcon height={16} width={16} className="text-gray-300" />
        {t('linkedTo', { ns: 'note' })} {getText()}
      </p>
    </>
  )
}
