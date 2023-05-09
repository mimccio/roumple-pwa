import { cl } from '&/common/utils'

interface Props {
  isOpen: boolean
}

export function Menu({ isOpen }: Props) {
  return (
    <div
      className={cl(
        'absolute bottom-0 left-0 right-0 top-0 bg-red-100 md:relative md:w-80 xl:w-96',
        isOpen ? 'z-40' : 'z-0'
      )}
    >
      Menu Component
    </div>
  )
}
