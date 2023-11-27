import { useTranslation } from 'react-i18next'
import { useAtom } from 'jotai'
import { TagIcon, PlusIcon, ArchiveBoxIcon } from '@heroicons/react/24/solid'
import { ArchiveBoxIcon as ArchiveBoxOutlineIcon, ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline'

import { TW_COLOR_BORDER_500, TW_COLOR_TEXT_500 } from '@/common/constants'
import { cl } from '@/common/utils'
import { Tooltip } from '@/common/components/tooltip'
import type { SortType } from '@/modules/routine/types'
import { categoryAtom } from '@/modules/category/atoms'
import { RoutinesMenu } from './routines-menu'

interface Props {
  archived: boolean
  onCreate: () => void
  handleShowArchived: () => void
  handleSortChange: (sortType: SortType) => void
  handleGroupBySchedule: () => void
}

export function Header({ handleShowArchived, archived, onCreate, handleSortChange, handleGroupBySchedule }: Props) {
  const { t } = useTranslation(['common', 'routine', 'action'])
  const [category, setCategory] = useAtom(categoryAtom)

  return (
    <header
      className={cl(
        'flex h-14 w-full items-center justify-between border-b-4 px-2 transition-colors xl:px-4',
        category?.color ? TW_COLOR_BORDER_500[category.color] : 'border-gray-200'
      )}
    >
      <div className=" text flex h-full items-center text-xl font-bold leading-6 text-gray-500">
        <ArrowPathRoundedSquareIcon width={20} className="text-gray-400" />

        <h1 className="ml-2">{t('routines', { ns: 'common' })}</h1>
      </div>
      <div className="relative flex gap-1">
        <RoutinesMenu handleSortChange={handleSortChange} handleGroupBySchedule={handleGroupBySchedule} />

        <Tooltip message={t('createRoutine', { ns: 'routine' })}>
          <button className="group p-2" onClick={onCreate}>
            <PlusIcon width={24} className="text-gray-400 transition-colors group-hover:text-gray-500" />
          </button>
        </Tooltip>
        <Tooltip message={archived ? t('showActive', { ns: 'action' }) : t('showArchived', { ns: 'action' })}>
          <button onClick={handleShowArchived} className="group p-2">
            {archived && (
              <ArchiveBoxIcon width={20} className="text-emerald-400 transition-colors group-hover:text-emerald-500" />
            )}
            {!archived && (
              <ArchiveBoxOutlineIcon width={20} className="text-gray-400 transition-colors group-hover:text-gray-500" />
            )}
          </button>
        </Tooltip>
        <button disabled={!category} onClick={() => setCategory(null)} className="p-2">
          <TagIcon
            width={20}
            className={cl('transition-colors', category?.color ? TW_COLOR_TEXT_500[category.color] : 'text-gray-300')}
          />
        </button>
      </div>
    </header>
  )
}
