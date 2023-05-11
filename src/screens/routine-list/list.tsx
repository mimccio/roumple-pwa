import { ListSkeleton } from '&/common/components/list-skeleton'
import { useRoutines } from '&/modules/routine/hooks'
import { Item } from './item'

export function List() {
  const { routines, isLoading } = useRoutines()

  return (
    <div className="flex flex-col gap-4 px-2">
      {isLoading && <ListSkeleton />}
      {routines?.map((routine) => (
        <Item key={routine.id} routine={routine} />
      ))}
    </div>
  )
}
