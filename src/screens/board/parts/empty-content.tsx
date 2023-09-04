import { Trans, useTranslation } from 'react-i18next'
import { useAtom } from 'jotai'

import { EmptyMainContent } from '&/common/components/empty-screens'
import successImg from '&/assets/illustrations/success.png'
import orderCompletedImg from '&/assets/illustrations/order-completed.png'
import { categoryAtom } from '&/modules/category/atoms'

interface Props {
  showStatus: { empty: boolean; emptyFilteredList: boolean }
  showDone: boolean
}

export function EmptyContent({ showStatus, showDone }: Props) {
  const { t } = useTranslation('empty')
  const [category] = useAtom(categoryAtom)
  const showEmpty = showStatus.emptyFilteredList || showStatus.empty

  if (!showEmpty) return null

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
    <div className="absolute bottom-0 top-0 w-full">
      {!showDone && <EmptyMainContent text={todoText} image={orderCompletedImg} />}
      {showDone && <EmptyMainContent text={doneText} image={successImg} />}
    </div>
  )
}
