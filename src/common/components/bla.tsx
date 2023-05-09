import { Link } from 'react-router-dom'

export function Bla() {
  return (
    <div className="text-3xl font-bold text-indigo-500 underline">
      <p>Bla Component</p>
      <Link to="routines">Routines</Link>
    </div>
  )
}
