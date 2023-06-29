import { NameEditor } from '&/common/components/inputs/name-editor'

interface Props {
  name: string
  onChange: (name: string) => void
  setCharNum?: (num: number) => void
}

export function TaskName({ name, onChange, setCharNum }: Props) {
  return (
    <div>
      <span className="text-sm font-bold text-gray-400">Name</span>
      <div className="rounded-lg border p-2">
        <NameEditor
          name={name}
          id={'new-task-name'}
          submit={onChange}
          placeholder="Enter task name"
          autofocus
          setCharNum={setCharNum}
        />
      </div>
    </div>
  )
}
