import { redirect } from 'react-router-dom'
import { db } from '@/db'

// Keep false instead you want to unBoard user to access welcome page
const unBoard = false

// Only use in "development mode" to unBoard user when needed
const unOnboardUser = async () => {
  if (!unBoard || import.meta.env.MODE !== 'development') return
  console.error('unBoard is set to true !')
  await db.auth.updateUser({ data: { onboarded: false } })
}

export const appLoader = async () => {
  const { data, error } = await db.auth.getSession()
  if (error) throw error
  if (!data?.session?.user) return redirect('/login')
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
  if (!data?.session?.user) return redirect('/login')
  // Only used in "development mode" to unBoard user when needed
  if (unBoard) await unOnboardUser()
  // end
  if (data.session?.user?.user_metadata?.onboarded === true) return redirect('/today')
  return { session: data.session }
}
