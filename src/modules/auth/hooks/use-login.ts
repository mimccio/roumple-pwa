import { useState } from 'react'
import type { FormEvent } from 'react'

import { db } from '&/db'
import { useNavigate } from 'react-router'

// TODO?: use react-hook-form in order to handle form errors
export const useLogin = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [verifyIsLoading, setVerifyIsLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')

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
      if (error) throw error
      setIsDone(true)
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const verifyOpt = async (opt: string) => {
    setVerifyIsLoading(true)
    try {
      const { error } = await db.auth.verifyOtp({
        email: email,
        token: opt.trim(),
        type: 'email',
      })
      if (error) throw error
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setVerifyIsLoading(false)
      navigate('/today')
    }
  }

  const handleVerify = async (event: FormEvent) => {
    event.preventDefault()
    verifyOpt(code)
  }

  const handleChange = async (value: string) => {
    setCode(value)
    if (value.length === 6) {
      verifyOpt(value)
    }
  }

  const reset = () => setIsDone(false)

  return { handleLogin, isLoading, setEmail, email, isDone, handleChange, code, handleVerify, reset, verifyIsLoading }
}
