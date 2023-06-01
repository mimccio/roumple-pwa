import { TodoBtn, InProgressBtn, DoneBtn } from './parts'

export function StatusSelector() {
  return (
    <div className="flex items-center gap-4">
      <TodoBtn handleClick={() => console.log('done')} isSelected={false} />
      <InProgressBtn handleClick={() => console.log('InProgressBtn')} isSelected={false} />
      <DoneBtn handleClick={() => console.log('done')} isSelected={false} />
    </div>
  )
}
