import { Trans, useTranslation } from 'react-i18next'
import { BugAntIcon, LightBulbIcon, MegaphoneIcon } from '@heroicons/react/24/outline'

export function FeedbackScreen() {
  const { t } = useTranslation('feedback')
  return (
    <div className="relative mt-8 flex w-full flex-1 flex-col items-center p-4 ">
      <h2 className="text-center text-lg font-bold text-gray-600">Feedback</h2>
      <div className="mt-12 flex w-full max-w-3xl flex-col gap-y-4 text-gray-600 sm:px-4">
        <p className="flex items-start gap-x-4">
          <span>
            <BugAntIcon width={20} className="mt-0.5 text-gray-500" />
          </span>
          <span>
            <Trans t={t} i18nKey="reportBug">
              You can report a <span className="font-bold">bug</span> by clicking on
              <a className="text-indigo-500 transition-colors hover:text-indigo-600" href="https://discord.gg/zzXtZa9V">
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
              <a className="text-indigo-500 transition-colors hover:text-indigo-600" href="https://discord.gg/WPWaSbvb">
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
      <div className="mt-8 hidden h-full w-full 2xl:block">
        <iframe
          title="product board"
          src="https://starter.productboard.com/roumple-starter/1-roumple-roadmap"
          className="h-full w-full"
        ></iframe>
      </div>
    </div>
  )
}
