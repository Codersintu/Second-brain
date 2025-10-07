
import { useRecoilValue, useSetRecoilState } from "recoil"
import Card from "./Card"
import ShareIcon from "./ShareIcon"
import { contentAtom, showAtom } from "./Atom"
import { useEffect } from "react"
import axios from "axios"
import { BACKEND_URL } from "./Config"

function Content() {
 const setshow=useSetRecoilState(showAtom)
 const setContent=useSetRecoilState(contentAtom)
 const content=useRecoilValue(contentAtom)
 
 useEffect(()=>{
  const fetchData=async()=>{
    try {
    const response=await axios.get(`${BACKEND_URL}/api/v1/content`,{
      headers: {
    Authorization: localStorage.getItem("token"),
    }})
    console.log("fetch suceesfully",response.data.contentall)
    setContent(response.data.contentall)
  } catch (error) {
    console.log("failed fetch",error)
    
  }
  };
  const intervalId = setInterval(() => {
     fetchData();
  }, 3000);

  return () => clearInterval(intervalId);
 
 },[])

async function shareBtn(){
  const response= await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
    share:true
   },{
    headers: {
        Authorization: localStorage.getItem("token"),
    },
   })
   console.log("share link",response.data)
   const hashed=`${BACKEND_URL}/${response.data.hash}/${response.data._id}`
   console.log("hashed data",hashed)
}

  return (
    <>
    <div className="md:p-10 flex-1 h-screen bg-cyan-50 font-serif gap-10 overflow-auto relative z-0 group">  
     <div className="flex justify-between items-center">
      <h1 className="md:text-2xl text-xl font-semibold">All Notes</h1>
      <div className="flex gap-5 items-center">
        <div className="flex items-center gap-2 bg-cyan-100 rounded-lg md:p-2 p-1 cursor-pointer" onClick={shareBtn}>
          <ShareIcon/>
          <p className="text-blue-600 hidden md:block">Share Brain</p>
        </div>
        {/* created own btn  */}
        <button className="bg-blue-600 p-2 rounded-md text-white font-serif " onClick={()=>setshow(true)}>+ Add Content</button>
        
      </div>
     </div>
     <div className="mt-12 card grid grid-cols-4  gap-10">
      {content.map((item)=>(
      <Card key={item._id} contentId={item._id} type={item.type} link={item.link} title={item.title} date={new Date(item.createdAt).toLocaleString()}/>
      ))}
      
     </div>
    </div>
    
    </>
  )
}

export default Content