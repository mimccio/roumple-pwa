import { redirect } from 'react-router-dom'
import { db } from '&/db'

export const appLoader = async () => {
  const { data, error } = await db.auth.getSession()
  if (error) throw error
  if (data.session) return { session: data.session }
  return redirect('/login')
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
