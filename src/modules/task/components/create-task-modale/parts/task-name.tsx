import { useTranslation } from 'react-i18next'
import { ModaleNameEditor } from '@/common/components/inputs/modale-name-editor'

interface Props {
  name: string
  onChange: (name: string) => void
  setCharNum?: (num: number) => void
}

export function TaskName({ name, onChange, setCharNum }: Props) {
  const { t } = useTranslation(['common', 'task'])
  return (
    <div>
      <span className="text-sm font-bold text-gray-400">{t('name', { ns: 'common' })}</span>
      <div className="rounded-lg border p-2">
        <ModaleNameEditor
          name={name}
          id={'new-task-name'}
          submit={onChange}
          placeholder={t('enterTaskName', { ns: 'task' })}
          autofocus
          setCharNum={setCharNum}
        />
      </div>
    </div>
  )
}
