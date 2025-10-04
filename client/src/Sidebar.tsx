
function Sidebar() {
  return (
    <div className="md:w-64 w-16 h-screen shadow-md bg-white top-0 sticky z-10">
      <div className="flex flex-col md:px-5 px-2 py-4 gap-10">
        <div className="flex gap-4 items-center">
            <img className="w-10" src="../brain.png" alt="" />
            <h1 className="text-2xl hidden md:block text-blue-600 font-semibold">Second Brain</h1>
        </div>
         <div className="flex flex-col justify-center gap-7">
            <div className="flex items-center hover:bg-gray-300 p-1 rounded-md cursor-pointer font-semibold gap-5">
              
                <img className="w-6" src="../x.png" alt="" />
                <p className="hidden md:block">Tweets</p>
            </div>
            <div className="flex items-center hover:bg-gray-300 p-1 rounded-md cursor-pointer font-semibold gap-5">
                <img className="w-6" src="../tube.png" alt="" />
                <p className="hidden md:block">Videos</p>
            </div>
            <div className="flex items-center hover:bg-gray-300 p-1 rounded-md cursor-pointer font-semibold gap-5">
                <img className="w-6" src="../docs.png" alt="" />
                <p className="hidden md:block">Documents</p>
            </div>
            <div className="flex items-center hover:bg-gray-300 p-1 rounded-md cursor-pointer font-semibold gap-5">
                <img className="w-6" src="../link.png" alt="" />
                <p className="hidden md:block">Links</p>
            </div>
            <div className="flex items-center hover:bg-gray-300 p-1 rounded-md cursor-pointer font-semibold gap-5">
                <span>#</span>
                <p className="hidden md:block">Tags</p>
            </div>
         </div>
      </div>
    </div>
  )
}

export default Sidebar