
import { useRecoilValue, useSetRecoilState } from "recoil"
import Card from "./Card"
import ShareIcon from "./ShareIcon"
import { dataInfoAtom, showAtom } from "./Atom"
import { Link } from "react-router-dom"

function Content() {
 const setshow=useSetRecoilState(showAtom)
 const userInfo=useRecoilValue(dataInfoAtom)
 console.log("userInfo",userInfo)
  return (
    <>
    <div className="md:p-10 flex-1 h-screen bg-cyan-50 font-serif gap-10 overflow-auto relative z-0 group">  
     <div className="flex justify-between items-center">
      <Link to="/auth">
      <h1 className="md:text-2xl text-xl font-semibold">All Notes</h1>
      </Link>
      <h1 className="">Welcome {userInfo?.user?.username }</h1>
      <div className="flex gap-5 items-center">
        <div className="flex items-center gap-2 bg-cyan-100 rounded-lg md:p-2 p-1 cursor-pointer">
          <ShareIcon/>
          <p className="text-blue-600 hidden md:block">Share Brain</p>
        </div>
        {/* created own btn  */}
        <button className="bg-blue-600 p-2 rounded-md text-white font-serif " onClick={()=>setshow(true)}>+ Add Content</button>
        
      </div>
     </div>
     <div className="mt-12 card grid grid-cols-4  gap-10">
      <Card type="twitter" link="https://x.com/mahto_sint35616/status/1971119568077930517" title="Post of Twitter"/>
      <Card type="twitter" link="https://x.com/mahto_sint35616/status/1971119568077930517" title="post of twitter"/>
      <Card type="youtube" link="https://www.youtube.com/watch?v=XHjxj78AYc0&list=RDXHjxj78AYc0&start_radio=1" title="Post of Youtube"/>
      <Card type="twitter" link="https://x.com/mahto_sint35616/status/1971119568077930517" title="post of twitter"/>
      <Card type="twitter" link="https://x.com/mahto_sint35616/status/1971119568077930517" title="post of twitter"/>
     </div>
    </div>
    
    </>
  )
}

export default Content