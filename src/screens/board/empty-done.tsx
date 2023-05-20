import successImg from '&/assets/illustrations/success.png'

export function EmptyDone() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="group mb-20 flex w-full flex-col items-center justify-center gap-4 py-8">
        <img src={successImg} className="mx-auto flex h-52 w-52 items-center justify-center opacity-75" />
        <p className="text-center text-sm font-semibold text-gray-400">Nothing done yet</p>
      </div>
    </div>
  )
}
