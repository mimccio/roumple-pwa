import { Trans, useTranslation } from 'react-i18next'

import { EmptyMainContent } from '&/common/components/empty-screens'
import workflowImg from '&/assets/illustrations/workflow.png'
import successImg from '&/assets/illustrations/success.png'
import locationImg from '&/assets/illustrations/location.png'

interface Props {
  category: { name: string } | null
  showStatus: { empty: boolean; emptyFilteredList: boolean }
  showDone: boolean
  onOpenCreate: () => void
}

export function EmptyContent({ showStatus, category, showDone, onOpenCreate }: Props) {
  const { t } = useTranslation('task')

  return (
    <>
      {showStatus.empty && !showDone && (
        <EmptyMainContent onClick={onOpenCreate} text={t('createNewTask')} image={workflowImg} />
      )}
      {showStatus.empty && showDone && <EmptyMainContent text={t('noDoneTask')} image={successImg} />}
      {showStatus.emptyFilteredList && category && !showDone && (
        <EmptyMainContent
          text={
            <Trans t={t} i18nKey="noTaskWithCategory" values={{ category: category.name }}>
              No task with <span className="font-semibold">{category.name}</span> category
            </Trans>
          }
          image={locationImg}
        />
      )}
      {showStatus.emptyFilteredList && category && showDone && (
        <EmptyMainContent
          text={
            <Trans t={t} i18nKey="noDoneTaskWithCategory" values={{ category: category.name }}>
              No done task with <span className="font-semibold">{category.name}</span> category
            </Trans>
          }
          image={locationImg}
        />
      )}
    </>
  )
}
