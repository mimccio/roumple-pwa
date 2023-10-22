import workflowImg from '&/assets/illustrations/workflow.png'
import { useGetTemplates } from '&/modules/template/hooks'
import { TemplateItem, TemplateItemSkeleton } from '&/modules/template/components'
import { MainError } from '../errors'

export function TemplatesScreen() {
  const { templateList, error, isLoading } = useGetTemplates()

  if (error) {
    return (
      <div className="flex w-full items-center justify-center">
        <MainError />
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col p-4">
      <div className="mt-24 flex flex-col items-center">
        <h1 className="mb-12 text-2xl font-semibold text-gray-500">
          {isLoading || templateList?.length ? 'Select a template' : 'No template yet'}
        </h1>
        <img
          alt=""
          src={workflowImg}
          className="mx-auto flex h-52 w-52 items-center justify-center opacity-50"
          aria-hidden="true"
        />
      </div>
      <div className="mb-40 mt-16 flex flex-col items-center justify-center">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-8">
          {isLoading && (
            <>
              <TemplateItemSkeleton />
              <TemplateItemSkeleton />
            </>
          )}
          {templateList?.map((template) => (
            <TemplateItem key={template.id} template={template} />
          ))}
        </div>
      </div>
    </div>
  )
}
