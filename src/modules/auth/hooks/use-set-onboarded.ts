import { db } from '&/db'
import { useIsOnboarded } from './use-is-onboarded'

export function useSetOnboarded() {
  const { getIsOnboarded } = useIsOnboarded()

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
