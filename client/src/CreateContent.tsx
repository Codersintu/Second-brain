import { useSetRecoilState } from "recoil"
import CrossIcon from "./CrossIcon"
import { showAtom } from "./Atom"
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "./Config";


export default function CreateContent() {
  const setshow=useSetRecoilState(showAtom)
  const titleRef = useRef<HTMLInputElement>(null);
  const linkref = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  async function Createcontent(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const title=titleRef.current?.value
    const link=linkref.current?.value
    const type=selectRef.current?.value
    
   try {
    const token=localStorage.getItem("token")
   const response=await axios.post(`${BACKEND_URL}/api/v1/content`,{title,type,link},{
    headers: {
    Authorization: `${token}`,
    }})
    console.log("content create successfully",response.data)
  
    setshow(false)
    alert("content create successfully")
    } catch (error) {
    console.log("content create failed",error)
    alert("content create Failed")
   }

  }
  return (
    <div className="w-full h-screen flex justify-center items-center absolute z-20 bg-black/30 ">
      <div className=" w-full max-w-xl bg-white rounded-lg shadow-sm p-5">
          {/* Title */}
          <div className="float-right cursor-pointer hover:bg-cyan-200 p-1 rounded-full" onClick={()=>setshow(false)}><CrossIcon /></div>
          
          <div className="mb-4 mt-5">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
            ref={titleRef}
              type="text"
              placeholder="Add a title"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Link */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Link</label>
            <input
            ref={linkref}
              type="url"
              placeholder="Add a link"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/*Type  */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Type</label>
            <select ref={selectRef} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none">
              <option>Twitter</option>
              <option>Youtube</option>
            </select>
          </div>

          <button onClick={Createcontent} className="w-full items-center bg-blue-600 py-2 text-white rounded-md">Submit</button>
          </div>
    </div>
  )
}
