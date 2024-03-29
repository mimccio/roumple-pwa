import { useTranslation } from 'react-i18next'
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline'

export function FeedbackHeader() {
  const { t } = useTranslation('common')
  return (
    <header className="flex h-14 w-full items-center justify-between border-b-4 border-gray-200 px-2 xl:px-4">
      <div className="text flex h-full items-center text-xl font-bold leading-6 text-gray-500">
        <ChatBubbleBottomCenterTextIcon width={20} className="text-gray-500" />

        <h1 className="ml-2">{t('feedback')}</h1>
      </div>
    </header>
  )
}
