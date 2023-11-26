import { Trans, useTranslation } from 'react-i18next'

import locationImg from '&/assets/illustrations/location.png'
import workflowImg from '&/assets/illustrations/workflow.png'
import {
  MainListError,
  MainListOffline,
  MainListFallback,
  MainListLoading,
} from '&/common/components/fallbacks/main-list'
import { ShowStatus } from '&/common/types'

interface Props {
  category: { name: string } | null
  showStatus: ShowStatus
  archived: boolean
  onOpenCreate: () => void
}

export function RoutinesFallback({ showStatus, category, archived, onOpenCreate }: Props) {
  const { t } = useTranslation('routine')

  return (
    <>
      {showStatus.loading && <MainListLoading />}
      {showStatus.error && <MainListError />}
      {showStatus.offline && <MainListOffline />}
      {showStatus.empty && !archived && (
        <MainListFallback onClick={onOpenCreate} text={t('createNewRoutine')} image={workflowImg} />
      )}
      {showStatus.empty && archived && <MainListFallback text={t('noArchivedRoutine')} image={locationImg} />}
      {showStatus.emptyFilteredList && category && !archived && (
        <MainListFallback
          text={
            <Trans t={t} i18nKey="noRoutineWithCategory" values={{ category: category.name }}>
              No routine with <span className="font-semibold">{category.name}</span> category
            </Trans>
          }
          image={locationImg}
        />
      )}
      {showStatus.emptyFilteredList && category && archived && (
        <MainListFallback
          text={
            <Trans t={t} i18nKey="noArchivedRoutineWithCategory" values={{ category: category.name }}>
              No archived routine with <span className="font-semibold">{category.name}</span> category
            </Trans>
          }
          image={locationImg}
        />
      )}
    </>
  )
}
