import { Item } from './item'

const routines = [
  {
    name: 'First routine',
    id: 12,
    priority: 0,
  },
  {
    name: 'Seconde routine',
    id: 2,
    priority: 1,
  },
  {
    name: 'Seconde routine',
    id: 3,
    priority: 1,
  },
  {
    name: 'Seconde routine',
    id: 4,
    priority: 1,
  },
]

export function List() {
  return (
    <ul className="flex flex-col gap-4 px-2 py-8">
      {routines.map((routine) => (
        <Item key={routine.id} routine={routine} />
      ))}
    </ul>
  )
}
