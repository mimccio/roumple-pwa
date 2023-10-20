import { redirect } from 'react-router-dom'
import { db } from '&/db'

export const appLoader = async () => {
  const { data, error } = await db.auth.getSession()
  if (error) throw error
  if (!data?.session?.user) return redirect('/login')

  // await db.auth.updateUser({ data: { onboarded: false } })

  if (!data.session.user?.user_metadata?.onboarded) return redirect('/welcome')
  return { user: data.session.user }
}

export const loginLoader = async () => {
  const { data, error } = await db.auth.getSession()
  if (error) throw error
  if (data.session) return redirect('/today')
  return null
}

export const logoutLoader = async () => {
  const { error } = await db.auth.signOut()
  if (error) throw error
  return redirect('/login')
}

export const onboardingLoader = async () => {
  const { data, error } = await db.auth.getSession()
  if (error) throw error
  if (data.session?.user?.user_metadata?.onboarded === true) return redirect('/first-step')
  return { session: data.session }
}
