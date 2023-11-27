import { PropagateLoader } from 'react-spinners'
import { SPINNER_COLOR } from '@/common/constants'

export function TitleSpinner() {
  return (
    <span className="w-6">
      <PropagateLoader loading color={SPINNER_COLOR} size={10} aria-label="Loading Spinner" />
    </span>
  )
}
