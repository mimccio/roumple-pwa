import { DetailsNavbar } from '&/common/components/layouts'
import { CloseNavBtn } from '&/common/components/buttons'
import { ItemMenu } from '&/common/components/menus'
// import type { Routine } from '&/modules/routine/types'

// interface Props {
//   routine: Routine
// }

export function RoutineNavbar() {
  return (
    <>
      <DetailsNavbar>
        <div>
          <ItemMenu />
        </div>
        <div>
          <CloseNavBtn />
        </div>
      </DetailsNavbar>
    </>
  )
}
