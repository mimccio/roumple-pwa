import { db } from '&/db'
import { useNavigate } from 'react-router-dom'

export function useSetOnboarded() {
  const navigate = useNavigate()

  const onSetOnboarded = async () => {
    const { error } = await db.auth.updateUser({
      data: { onboarded: true },
    })
    if (error) throw error
    navigate('/first-step')
  }
  return { onSetOnboarded }
}
