import type { FormEvent } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { db } from '&/db'
import { useIsOnboarded } from './use-is-onboarded'

export const useLogin = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [verifyIsLoading, setVerifyIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const { getIsOnboarded } = useIsOnboarded()

  const handleEmailChange = (evt: FormEvent<HTMLInputElement>) => setEmail(evt.currentTarget.value)

  // TODO!: check redirect paths (button click & otp) for dev & prod

  const getPath = async () => {
    const isOnboarded = await getIsOnboarded()
    return isOnboarded ? '/today' : '/welcome'
  }

  const getURL = async () => {
    let incompleteUrl = window.location.origin
    const path = await getPath()

    // Make sure to include `https://` when not localhost.
    incompleteUrl = incompleteUrl.includes('http') ? incompleteUrl : `https://${incompleteUrl}`
    // Redirect to /today if already onboarded and to /welcome if not
    incompleteUrl = `${incompleteUrl}${path}`
    // Make sure to including trailing `/`.
    return incompleteUrl.charAt(incompleteUrl.length - 1) === '/' ? incompleteUrl : `${incompleteUrl}/`
  }

  const handleLogin = async (e: FormEvent) => {
    try {
      setIsLoading(true)
      e.preventDefault()
      const emailRedirectTo = await getURL()
      const { error } = await db.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo,
          data: { lang: navigator.language.slice(0, 2) },
        },
      })
      if (error) throw error
      navigate('email-sent')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const verifyOpt = async (opt: string) => {
    try {
      setVerifyIsLoading(true)
      const path = await getPath()
      const { error } = await db.auth.verifyOtp({
        email: email,
        token: opt.trim(),
        type: 'email',
      })
      if (error) throw error
      navigate(path)
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setVerifyIsLoading(false)
    }
  }

  const handleVerify = async (event: FormEvent) => {
    event.preventDefault()
    verifyOpt(code)
  }

  const handleOptChange = async (value: string) => {
    setCode(value)
    if (value.length === 6) {
      verifyOpt(value)
    }
  }

  return {
    code,
    email,
    handleEmailChange,
    handleLogin,
    handleOptChange,
    handleVerify,
    isLoading,
    verifyIsLoading,
  }
}
