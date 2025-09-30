
function Card() {
  return (
     <div className="w-72 bg-white shadow-md rounded-xl border p-4">
      <div className="p-0 flex flex-col gap-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="./x.png" alt="twitter" className="w-5 h-5" />
            <h2 className="font-semibold">Productivity Tip</h2>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <img  src="./share.png" className="cursor-pointer w-6" />
            <img src="./delete.png" className="cursor-pointer w-6" />
          </div>
        </div>

        {/* Content */}
        <p className="text-gray-700 text-sm leading-relaxed">
          The best way to learn is to build in public. Share your progress, get
          feedback, and help others along the way.
        </p>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg text-xs">
            #productivity
          </span>
          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg text-xs">
            #learning
          </span>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400">Added on 08/03/2024</p>
      </div>
    </div>
  )
}

export default Card