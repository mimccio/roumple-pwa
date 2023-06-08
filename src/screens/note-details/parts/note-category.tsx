import { CategorySelector } from '&/common/components/inputs/category-selector'

import type { Note } from '&/modules/note/types'
import { useNoteCategory } from '&/modules/note/hooks'

interface Props {
  note: Note
}

export function NoteCategory({ note }: Props) {
  const { categoryList, isLoading, error, onSelect } = useNoteCategory(note)

  return (
    <>
      <CategorySelector
        category={note.category}
        categoryList={categoryList}
        isLoading={isLoading}
        isError={Boolean(error)}
        onSelect={onSelect}
      />
    </>
  )
}
