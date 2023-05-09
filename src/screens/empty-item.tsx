import educationImg from '&/assets/illustrations/education.png'

export function EmptyItem() {
  return (
    <div className="flex h-4/5 flex-col items-center justify-center gap-4">
      <img
        src={educationImg}
        alt="Persons working on a new workflow illustration"
        className="mx-auto flex h-52 w-52 items-center justify-center opacity-25"
      />
      <p className="text-center text-sm font-semibold text-gray-300">Select an item to view the details</p>
    </div>
  )
}
