import type { TemplateListItem } from '&/modules/template/types'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

interface Props {
  template: TemplateListItem
}

export function TemplateItem({ template }: Props) {
  return (
    <Link className="relative flex h-72 w-96 flex-col rounded-lg border-2 bg-gray-50 p-4 shadow-md" to={template.id}>
      <DocumentDuplicateIcon className="absolute w-8 text-gray-400" />
      <h3 className="text-center text-2xl font-semibold">{template.name}</h3>
      <p className="mt-4 line-clamp-6 text-center text-lg">{template.description}</p>
      <p className="absolute bottom-2 left-0 right-0 pt-2 text-center text-sm text-gray-500">see details</p>
    </Link>
  )
}
