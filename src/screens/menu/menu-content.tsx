import { BoardNav } from './board/board-nav'
import { MainNav } from './main-nav/main-nav'

interface Props {
  close: () => void
}

export function MenuContent({ close }: Props) {
  return (
    <div className="no-scrollbar flex h-screen min-h-screen flex-col overflow-y-auto bg-slate-100">
      <BoardNav close={close} />
      <MainNav close={close} />
    </div>
  )
}
