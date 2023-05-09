import { useLocation } from 'react-router-dom'

export const useMainPath = () => {
  const { pathname } = useLocation()

  const mainPath = pathname.split('/d')[0]

  return { mainPath }
}
