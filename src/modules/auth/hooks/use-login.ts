import { useState } from 'react'
import type { FormEvent } from 'react'

import { db } from '&/db'

// TODO: use react-hook-form in order to handle form errors
export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')

  const getURL = () => {
    let incompleteUrl = window.location.href
    // Make sure to include `https://` when not localhost.
    incompleteUrl = incompleteUrl.includes('http') ? incompleteUrl : `https://${incompleteUrl}`
    // Make sure to including trailing `/`.
    return incompleteUrl.charAt(incompleteUrl.length - 1) === '/' ? incompleteUrl : `${incompleteUrl}/`
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      const { error } = await db.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: getURL(),
          data: {
            lang: 'en',
          },
        },
      })
      await db.auth.updateUser({
        data: {
          lang: 'es',
        },
      })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { handleLogin, isLoading, setEmail, email }
}
