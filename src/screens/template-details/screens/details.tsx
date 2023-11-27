import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeftIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'

import educationImg from '@/assets/illustrations/education.png'
import { useToggleOpen } from '@/common/hooks'
import { EmptyScreen } from '@/common/components/empty-screen'
import type { Template } from '@/modules/template/types'
import { ConfirmUseTemplateModale, ListItem, NoteListItem } from '@/modules/template/components'

interface Props {
  template: Template
  onUseTemplate: () => void
}

export function Details({ template, onUseTemplate }: Props) {
  const { t } = useTranslation(['common', 'template'])
  const navigate = useNavigate()
  const { isOpen, close, open } = useToggleOpen()

  const goBack = () => navigate(-1)

  return (
    <div className="mx-auto w-full max-w-3xl px-1 py-8 sm:px-4">
      <section className="mb-8 flex items-center justify-between">
        <button
          className="rounded-lg border border-transparent p-2 text-gray-600 transition-colors hover:border-gray-200 hover:text-gray-700"
          onClick={goBack}
        >
          <ArrowLeftIcon className="w-6 text-gray-600" />
        </button>
        <button
          onClick={open}
          className="rounded-lg border border-indigo-500 px-4 py-2 font-semibold text-indigo-500 transition-colors hover:border-indigo-600 hover:bg-indigo-50 hover:text-indigo-600"
        >
          {t('use this template', { ns: 'template' })}
        </button>
      </section>

      <div className="mb-8 rounded-lg border shadow-md">
        <section className="rounded-t-lg border-b bg-gray-100 p-4">
          <h2 className="flex items-center gap-x-2 py-4 text-2xl font-semibold">
            <DocumentDuplicateIcon className="w-6 text-gray-400" /> {template.name}
          </h2>
          <p className="py-2">{template.description}</p>
        </section>

        <section className="mb-8 mt-4 p-4">
          {template.routines.length > 0 && (
            <div>
              <h4 className="font-bold text-gray-500">{t('routines', { ns: 'common' })}</h4>
              <div className="mt-2 flex flex-col gap-y-2">
                {template.routines.map((routine) => (
                  <ListItem item={routine} key={routine.id} />
                ))}
              </div>
            </div>
          )}

          {template.tasks.length > 0 && (
            <div className="mt-8">
              <h4 className="font-bold text-gray-500">{t('tasks', { ns: 'common' })}</h4>
              <div className="mt-2 flex flex-col gap-y-2">
                {template.tasks.map((task) => (
                  <ListItem item={task} key={task.id} />
                ))}
              </div>
            </div>
          )}

          {template.notes.length > 0 && (
            <div className="mt-8">
              <h4 className="font-bold text-gray-500">{t('notes', { ns: 'common' })}</h4>
              <div className="mt-2 flex flex-col gap-y-2">
                {template.notes.map((note) => (
                  <NoteListItem note={note} key={note.id} />
                ))}
              </div>
            </div>
          )}

          {!template.routines.length && !template.tasks.length && !template.notes.length && (
            <EmptyScreen text={t('noItem', { ns: 'common' })} opacity image={educationImg} />
          )}
        </section>
      </div>
      <ConfirmUseTemplateModale isOpen={isOpen} close={close} onUseTemplate={onUseTemplate} />
    </div>
  )
}
