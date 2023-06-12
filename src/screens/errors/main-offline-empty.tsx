import animalCareImg from '&/assets/illustrations/animal-care.png'

export function MainOfflineEmpty() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="group mb-20 flex w-full flex-col items-center justify-center gap-4 py-8">
        <img src={animalCareImg} className="mx-auto flex h-52 w-52 items-center justify-center opacity-50" />
        <p className="text-center text-sm font-semibold text-gray-300">We`&apos;`re offline and have no data to show</p>
      </div>
    </div>
  )
}
