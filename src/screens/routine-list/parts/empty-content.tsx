import { Trans, useTranslation } from 'react-i18next'

import locationImg from '&/assets/illustrations/location.png'
import workflowImg from '&/assets/illustrations/workflow.png'
import { EmptyMainContent } from '&/common/components/empty-screens'

interface Props {
  category: { name: string } | null
  showStatus: { empty: boolean; emptyFilteredList: boolean }
  archived: boolean
  onOpenCreate: () => void
}

export function EmptyContent({ showStatus, category, archived, onOpenCreate }: Props) {
  const { t } = useTranslation('routine')

  return (
    <>
      {showStatus.empty && !archived && (
        <EmptyMainContent onClick={onOpenCreate} text={t('createNewRoutine')} image={workflowImg} />
      )}
      {showStatus.empty && archived && <EmptyMainContent text={t('noArchivedRoutine')} image={locationImg} />}
      {showStatus.emptyFilteredList && category && !archived && (
        <EmptyMainContent
          text={
            <Trans t={t} i18nKey="noRoutineWithCategory" values={{ category: category.name }}>
              No routine with <span className="font-semibold">{category.name}</span> category
            </Trans>
          }
          image={locationImg}
        />
      )}
      {showStatus.emptyFilteredList && category && archived && (
        <EmptyMainContent
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
