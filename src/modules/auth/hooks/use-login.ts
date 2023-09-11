import type { FormEvent } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { db } from '&/db'

export const useLogin = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [verifyIsLoading, setVerifyIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')

  const handleEmailChange = (evt: FormEvent<HTMLInputElement>) => setEmail(evt.currentTarget.value)

  const getURL = () => {
    let incompleteUrl = window.location.href

    console.log('incompleteUrl :', incompleteUrl)
    console.log('window.location :', window.location)
    console.log('window.location.origin :', window.location.origin)

    // Make sure to include `https://` when not localhost.
    incompleteUrl = incompleteUrl.includes('http') ? incompleteUrl : `https://${incompleteUrl}`
    // Make sure to including trailing `/`.
    return incompleteUrl.charAt(incompleteUrl.length - 1) === '/' ? incompleteUrl : `${incompleteUrl}/`
  }

  const handleLogin = async (e: FormEvent) => {
    try {
      e.preventDefault()
      setIsLoading(true)
      const { error } = await db.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: getURL(),
          data: {
            lang: navigator.language.slice(0, 2),
          },
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
      const { error } = await db.auth.verifyOtp({
        email: email,
        token: opt.trim(),
        type: 'email',
      })
      if (error) throw error
      navigate('/today')
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
