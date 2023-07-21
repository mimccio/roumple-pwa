import { useTranslation } from 'react-i18next'
import {
  DocumentTextIcon,
  TagIcon,
  Cog6ToothIcon,
  ArrowPathRoundedSquareIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'

import { NavItem } from './nav-item'
interface Props {
  close: () => void
}

export function MainNav({ close }: Props) {
  const { t } = useTranslation('common')

  return (
    <section className="flex flex-col gap-1 border-b py-4">
      <NavItem close={close} name={t('routines')} to="routines" Icon={ArrowPathRoundedSquareIcon} />
      <NavItem close={close} name={t('tasks')} to="tasks" Icon={CheckCircleIcon} />
      <NavItem close={close} name={t('notes')} to="notes" Icon={DocumentTextIcon} />
      <NavItem close={close} name={t('categories')} to="categories" Icon={TagIcon} />
      <NavItem close={close} name={t('settings')} to="settings" Icon={Cog6ToothIcon} />
    </section>
  )
}
