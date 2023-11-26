import { db } from '&/db'

export const getIsOnboarded = async () => {
  const { data, error } = await db.auth.getSession()
  if (error) throw error
  if (data.session?.user?.user_metadata?.onboarded) return true
  return false
}
