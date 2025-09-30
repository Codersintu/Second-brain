import Card from "./Card"

function Content() {
  return (
    <div className="md:p-10 flex-1 h-screen bg-cyan-50 font-serif gap-10 overflow-auto">
     <div className="flex justify-between items-center">
      <h1 className="md:text-2xl text-xl font-semibold">All Notes</h1>
      <div className="flex gap-5 items-center">
        <div className="flex items-center gap-2 bg-cyan-100 rounded-lg md:p-2 p-1 cursor-pointer">
          <img className="md:w-5 w-6" src="./share.png" alt="" />
          <p className="text-blue-600 hidden md:block">Share Brain</p>
        </div>
        <div className="flex items-center gap-2 p-2 bg-blue-600 rounded-lg cursor-pointer">
            <span className="text-white">+</span>
            <p className="text-white">Add Content</p>
        </div>
      </div>
     </div>
     <div className="mt-12 card grid grid-cols-4  gap-10">
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
     </div>
    </div>
  )
}

export default Content