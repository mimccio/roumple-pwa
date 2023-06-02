import { NameEditor } from '&/common/components/inputs/name-editor'

interface Props {
  name: string
  onChange: (name: string) => void
  setCharNum?: (num: number) => void
}

export function RoutineName({ name, onChange, setCharNum }: Props) {
  return (
    <div>
      <label className="text-sm font-bold text-gray-400">Name</label>
      <div className="rounded-lg border p-2">
        <NameEditor name={name} id={'new-routine-name'} submit={onChange} placeholder="Enter routine name" autofocus setCharNum={setCharNum} />
      </div>
    </div>
  )
}
