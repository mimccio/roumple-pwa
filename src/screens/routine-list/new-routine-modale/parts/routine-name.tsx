import { NameEditor } from '&/common/components/inputs/name-editor'

interface Props {
  name: string
  onChange: (name: string) => void
}

export function RoutineName({ name, onChange }: Props) {
  return (
    <div>
      <label className="text-sm font-bold text-gray-400">Name</label>
      <div className="rounded-lg border p-2">
        <NameEditor name={name} id={'new-routine-name'} submit={onChange} placeholder="New routine" />
      </div>
    </div>
  )
}
