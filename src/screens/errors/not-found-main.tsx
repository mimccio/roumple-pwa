import error404Img from '&/assets/illustrations/error-404.png'

export function NotFoundMain() {
  return (
    <div className="flex h-4/5 flex-col items-center justify-center gap-4">
      <img
        src={error404Img}
        alt="Not found"
        className="mx-auto flex h-52 w-52 items-center justify-center opacity-25"
      />
      <p className="text-center text-sm font-semibold text-gray-300">This page does not exist</p>
    </div>
  )
}
