import { useTranslation } from 'react-i18next'

import { DetailsNavbar } from '&/common/components/layouts'
import { CloseNavBtn } from '&/common/components/buttons'

import type { Routine } from '&/modules/routine/types'
import { NavbarContent } from './navbar-content'

interface Props {
  routine?: Routine
  date: Date
  handleDateChange: (date: Date) => void
}

export function RoutineNavbar({ routine, date, handleDateChange }: Props) {
  const { t } = useTranslation('common')

  return (
    <DetailsNavbar>
      <h4 className="text-sm font-semibold text-gray-500">{t('routine')}</h4>
      <div className="flex gap-x-2">
        {routine && <NavbarContent routine={routine} date={date} handleDateChange={handleDateChange} />}
        <CloseNavBtn />
      </div>
    </DetailsNavbar>
  )
}
