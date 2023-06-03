import { useLocation } from 'react-router-dom'

export const useMainPath = () => {
  const { pathname } = useLocation()
  return pathname.split('/d')[0]
}
