import { useState } from 'react'
import type { Category } from '../types'
import { useForm } from 'react-hook-form'

interface Params {
  category: Category
}

export function useEditCategory({ category }: Params) {
  const handleColorChange = (color: string) => {
    console.log(color)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string; id: string }>({
    values: category,
    mode: 'onBlur',
  })

  // const submit = handleSubmit((formData) => mutate({ ...routine, ...formData }))
  const submit = handleSubmit((formData) => console.log(formData))

  return { handleColorChange, errors, register, submit }
}
