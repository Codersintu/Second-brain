
import { useRecoilValue, useSetRecoilState } from "recoil"
import Card from "./Card"
import ShareIcon from "./ShareIcon"
import ErrorBoundary from "./Error/ErrorBoundary"
import { filterAtom, showAtom } from "./Atom"
import DocumentItem from "./DocumentItem"

function Content() {
const setshow=useSetRecoilState(showAtom)
const filter=useRecoilValue(filterAtom)

  return (
    <>
    <div className="md:p-10 flex-1 h-screen bg-cyan-50 font-serif gap-10 overflow-auto relative z-0 group">  
     <div className="flex justify-between items-center">
      <h1 className="md:text-2xl text-xl font-semibold">All Memory😍</h1>
      <div className="flex gap-5 items-center">
        <div className="flex items-center gap-2 bg-cyan-100 rounded-lg md:p-2 p-1 cursor-pointer">
          <ShareIcon/>
          <p className="text-blue-600 hidden md:block">Share Brain</p>
        </div>
        {/* created own btn  */}
        <button className="bg-blue-600 p-2 rounded-md text-white font-serif hover:bg-blue-500" onClick={()=>setshow(true)}>+ Add Content</button>
        
      </div>
     </div>

     <div className="mt-12 card grid grid-cols-4  gap-10">
      <ErrorBoundary>
        {filter === "Document📄" ? <DocumentItem/> :
      <Card/>}
      </ErrorBoundary>
     </div>
    </div>
    
    </>
  )
}

export default Content