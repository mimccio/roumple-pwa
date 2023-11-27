import { Trans, useTranslation } from 'react-i18next'
import { useAtom } from 'jotai'

import { EmptyMainContent } from '@/common/components/empty-screens'
import successImg from '@/assets/illustrations/success.png'
import orderCompletedImg from '@/assets/illustrations/order-completed.png'
import { categoryAtom } from '@/modules/category/atoms'
import { ShowStatus } from '@/common/types'
import { MainListError, MainListLoading, MainListOffline } from '@/common/components/fallbacks/main-list'

interface Props {
  showStatus: ShowStatus
  showDone: boolean
}

export function BoardFallback({ showStatus, showDone }: Props) {
  const { t } = useTranslation('empty')
  const [category] = useAtom(categoryAtom)
  const isEmpty = showStatus.emptyFilteredList || showStatus.empty

  const todoText =
    showStatus.emptyFilteredList && category ? (
      <Trans t={t} i18nKey="nothingToDOWithCategory" values={{ category: category.name }}>
        Nothing to do with <span className="font-semibold">{category.name}</span> category
      </Trans>
    ) : (
      t('emptyTodo')
    )

  const doneText =
    showStatus.emptyFilteredList && category ? (
      <Trans t={t} i18nKey="nothingDoneWithCategory" values={{ category: category.name }}>
        Nothing done with <span className="font-semibold">{category.name}</span> category
      </Trans>
    ) : (
      t('emptyDone')
    )

  return (
    <>
      {showStatus.loading && <MainListLoading />}
      {showStatus.error && <MainListError />}
      {showStatus.offline && <MainListOffline />}
      {isEmpty && !showDone && <EmptyMainContent text={todoText} image={orderCompletedImg} />}
      {isEmpty && showDone && <EmptyMainContent text={doneText} image={successImg} />}
    </>
  )
}
