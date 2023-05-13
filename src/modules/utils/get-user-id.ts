import { db } from '&/db'

export const getUserId = async () => {
  const { data } = await db.auth.getSession()
  const id = data?.session?.user.id
  if (!id) throw new Error('User id is missing')
  return id
}
