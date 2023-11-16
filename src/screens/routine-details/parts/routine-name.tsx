import { useTranslation } from 'react-i18next'

import type { Routine } from '&/modules/routine/types'
import { NameEditor } from '&/common/components/editors'
import { useEditRoutineName } from '&/modules/routine/hooks/use-edit-routine-name'

interface Props {
  routine: Routine
}

export function RoutineName({ routine }: Props) {
  const { t } = useTranslation('common')
  const { submit } = useEditRoutineName(routine)

  return (
    <div className="relative bg-gray-100">
      <span className="absolute bottom-1 right-2 text-xs lowercase text-gray-300">{t('name', { ns: 'common' })}</span>
      <NameEditor id={routine.id} name={routine.name} submit={submit} />
    </div>
  )
}
