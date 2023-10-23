import { db } from '&/db'
import { getIsOnboarded } from '../utils'

export function useSetOnboarded() {
  const onSetOnboarded = async () => {
    const isOnboarded = await getIsOnboarded()
    if (isOnboarded) return
    const { error } = await db.auth.updateUser({
      data: { onboarded: true },
    })
    if (error) throw error
  }
  return { onSetOnboarded }
}
