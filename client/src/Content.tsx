import Card from "./Card"

function Content() {
  return (
    <div className="p-10 flex-1 h-screen bg-cyan-50 font-serif gap-10">
     <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">All Notes</h1>
      <div className="flex gap-5 items-center">
        <div className="flex items-center gap-2 bg-cyan-100 rounded-lg p-2 cursor-pointer">
          <img className="w-5" src="./share.png" alt="" />
          <p className="text-blue-600">Share Brain</p>
        </div>
        <div className="flex items-center gap-2 p-2 bg-blue-600 rounded-lg cursor-pointer">
            <span className="text-white">+</span>
            <p className="text-white">Add Content</p>
        </div>
      </div>
     </div>
     <div className="mt-12 grid grid-cols-4 gap-10">
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