import type { FormEvent } from 'react'

interface Props {
  children: string
  id: string
  value: number
  checked: boolean
  handleChange: (evt: FormEvent<HTMLInputElement>) => void
}

export function PeriodItem({ children, value, id, checked, handleChange }: Props) {
  return (
    <li className="list-none">
      <input onChange={handleChange} checked={checked} value={value} id={id} type="radio" />
      <label className="ml-4" htmlFor={id}>
        {children}
      </label>
    </li>
  )
}
