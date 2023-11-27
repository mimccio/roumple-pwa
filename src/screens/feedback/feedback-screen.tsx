import { Trans, useTranslation } from 'react-i18next'
import { BugAntIcon, FaceSmileIcon, HandThumbUpIcon, LightBulbIcon, MegaphoneIcon } from '@heroicons/react/24/outline'

import { ContentLayout } from '@/common/components/layouts'
import { FeedbackHeader } from './parts/feedback-header'

export function FeedbackScreen() {
  const { t } = useTranslation('feedback')
  return (
    <>
      <FeedbackHeader />
      <ContentLayout>
        <div className="relative flex w-full flex-1 flex-col items-center p-4 ">
          <div className="mt-20 flex w-full max-w-2xl flex-col gap-y-4 text-gray-600 sm:px-4 2xl:mt-12">
            <p className="flex items-start gap-x-4">
              <span>
                <HandThumbUpIcon width={20} className="mt-0.5 text-gray-500" />
              </span>
              <span>
                <Trans t={t} i18nKey="supportWork">
                  You can <span className="font-bold">support the work</span> by clicking on this
                  <a
                    className="text-indigo-500 transition-colors hover:text-indigo-600"
                    href="https://www.buymeacoffee.com/roumple"
                  >
                    Buymeacoffee link
                  </a>
                </Trans>
              </span>
            </p>
            <p className="flex items-start gap-x-4">
              <span>
                <BugAntIcon width={20} className="mt-0.5 text-gray-500" />
              </span>
              <span>
                <Trans t={t} i18nKey="reportBug">
                  You can report a <span className="font-bold">bug</span> by clicking on
                  <a
                    className="text-indigo-500 transition-colors hover:text-indigo-600"
                    href="https://discord.gg/zzXtZa9V"
                  >
                    this Discord link
                  </a>
                </Trans>
              </span>
            </p>
            <p className="flex gap-x-4">
              <span>
                <LightBulbIcon width={20} className="mt-0.5 text-gray-500" />
              </span>
              <span>
                <Trans t={t} i18nKey="proposeFeature">
                  You can propose a <span className="font-bold">new feature</span> by clicking
                  <a
                    className="text-indigo-500 transition-colors hover:text-indigo-600"
                    href="https://discord.gg/WPWaSbvb"
                  >
                    this Discord link
                  </a>
                </Trans>
              </span>
            </p>
            <p className="flex gap-x-4 2xl:hidden">
              <span>
                <MegaphoneIcon width={20} className="mt-0.5 text-gray-500" />
              </span>
              <span>
                <Trans t={t} i18nKey="voteForFeatures">
                  You can vote for <span className="font-bold">new features</span> by clicking
                  <a
                    className="text-indigo-500 transition-colors hover:text-indigo-600"
                    href="https://starter.productboard.com/roumple-starter/1-roumple-roadmap"
                  >
                    this Product board link
                  </a>
                </Trans>
              </span>
            </p>
          </div>
          <p className="mt-12 flex items-center gap-x-2 text-gray-500">
            <FaceSmileIcon width={20} /> {t('ThanksForFeedback')}
          </p>
          <div className="mt-16 hidden h-full min-h-[500px] w-full rounded-md border shadow-md 2xl:block">
            <iframe
              title="product board"
              src="https://starter.productboard.com/roumple-starter/1-roumple-roadmap"
              className="h-full w-full rounded-md "
            ></iframe>
          </div>
        </div>
      </ContentLayout>
    </>
  )
}
