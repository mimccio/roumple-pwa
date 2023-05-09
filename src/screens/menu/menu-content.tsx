import { BoardNav } from './board/board-nav'
import { MainNav } from './main-nav/main-nav'

interface Props {
  close: () => void
}

export function MenuContent({ close }: Props) {
  return (
    <div className="flex h-full flex-col bg-slate-100">
      <BoardNav close={close} />
      <MainNav close={close} />
    </div>
  )
}
