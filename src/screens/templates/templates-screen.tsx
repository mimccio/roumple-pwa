import { useGetTemplates } from '&/modules/template/hooks'
import { TemplateItem, TemplateItemSkeleton } from '&/modules/template/components'

export function TemplatesScreen() {
  const { templateList, isLoading, error } = useGetTemplates()

  return (
    <div className="flex w-full flex-col p-4">
      <h1 className="mt-12 text-center text-2xl font-semibold">Templates</h1>
      <div className="mb-20 flex grow items-center justify-center">
        <div className="flex grow flex-wrap items-center justify-center gap-x-8 gap-y-8">
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
