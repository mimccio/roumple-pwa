import { BoardNav } from './board/board-nav'
import { Categories } from './categories/categories'
import { MainNav } from './main-nav/main-nav'

interface Props {
  close: () => void
}

export function MenuContent({ close }: Props) {
  return (
    <div className="no-scrollbar flex h-screen min-h-screen flex-col overflow-y-auto bg-gray-50 px-4">
      <BoardNav close={close} />
      <MainNav close={close} />
      <Categories />
    </div>
  )
}
