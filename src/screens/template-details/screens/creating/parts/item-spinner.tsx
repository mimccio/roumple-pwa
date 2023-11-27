import { MoonLoader } from 'react-spinners'
import { SPINNER_COLOR_STRONG } from '@/common/constants'

export function ItemSpinner() {
  return (
    <span className="w-6">
      <MoonLoader loading color={SPINNER_COLOR_STRONG} size={16} aria-label="Loading Spinner" />
    </span>
  )
}
