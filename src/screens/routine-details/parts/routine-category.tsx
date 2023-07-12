import { CategorySelector } from '&/common/components/inputs/category-selector/category-selector'
import type { Routine } from '&/modules/routine/types'
import { useRoutineCategory } from '&/modules/routine/hooks'

interface Props {
  routine: Routine
}

export function RoutineCategory({ routine }: Props) {
  const { categoryList, isLoading, error, onSelect } = useRoutineCategory(routine)

  return (
    <>
      <CategorySelector
        category={routine.category}
        categoryList={categoryList}
        isLoading={isLoading}
        isError={Boolean(error)}
        onSelect={onSelect}
      />
    </>
  )
}
