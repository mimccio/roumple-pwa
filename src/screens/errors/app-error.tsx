import fatalErrorImg from '&/assets/illustrations/fatal-error.png'
import { Link } from 'react-router-dom'

export function AppError() {
  return (
    <div className="flex h-full min-h-screen w-full  flex-col items-center justify-center">
      <div className="group mb-20 flex w-full flex-col items-center justify-center gap-4 py-8">
        <img src={fatalErrorImg} className="mx-auto flex h-52 w-52 items-center justify-center opacity-50" />
        <p className="text-center text-sm font-semibold text-gray-400">Sorry an error occurred :(</p>
        <Link className="mt-4 text-gray-400 transition-colors hover:text-indigo-500" to="/">
          Go back to home
        </Link>
      </div>
    </div>
  )
}
