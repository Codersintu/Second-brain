import { useRecoilState} from "recoil"
import { filterAtom } from "./Atom"
import { Link, useNavigate } from "react-router-dom"


function Sidebar() {
  const navigate=useNavigate()
  const [FilterContent,setFilter]=useRecoilState<string>(filterAtom)
 function Logouthandler() {
    localStorage.removeItem("token")
    localStorage.removeItem("cachedContent")
    localStorage.removeItem("cachedFile")
    navigate("/auth")
 }
  return (
    <div className="md:w-64 w-16 h-screen shadow-md bg-white top-0 sticky z-10">
      <div className="flex flex-col  md:px-5 px-2 py-4 gap-10">
        <div className="flex gap-4 items-center">
            <img className="w-10" src="https://ik.imagekit.io/j3whydwtk/general/brain.png" alt="" />
            <h1 className="text-2xl hidden md:block text-blue-600 font-semibold">Second Brain</h1>
        </div>
         <div className="flex flex-col justify-center gap-7">
          <Link to="/">
            <div className={`flex items-center hover:bg-gray-300 p-1 rounded-md cursor-pointer font-semibold gap-5 ${FilterContent==="" ? "bg-gray-300" :null}`} onClick={()=>setFilter("")}>
                <img className="w-6" src="https://ik.imagekit.io/j3whydwtk/general/home.png" alt="" />
                <p className="hidden md:block">Home</p>
            </div>
          </Link>
           <Link to="/">
          <div className={`flex items-center hover:bg-gray-300 p-1 rounded-md cursor-pointer font-semibold gap-5  ${FilterContent==="Youtube" ? "bg-gray-300" :null}`} onClick={()=>setFilter("Youtube")}>
                <img className="w-6" src="https://ik.imagekit.io/j3whydwtk/general/tube.png" alt="" />
                <p className="hidden md:block">YouTube</p>
            </div>
            </Link>

          <Link to="/">
            <div className={`flex items-center hover:bg-gray-300 p-1 rounded-md cursor-pointer font-semibold gap-5 ${FilterContent==="Twitter" ? "bg-gray-300" :null}`} onClick={()=>setFilter("Twitter")}> 
                <img className="w-6" src="https://ik.imagekit.io/j3whydwtk/general/x.png" alt="" />
                <p className="hidden md:block">Tweets</p>
            </div>
          </Link>
  
            <Link to="/">
            <div className={`flex items-center hover:bg-gray-300 p-1 rounded-md cursor-pointer font-semibold gap-5 ${FilterContent==="Document📄" ? "bg-gray-300" :null}`} onClick={()=>setFilter("Document📄")}>
                <img className="w-6" src="https://ik.imagekit.io/j3whydwtk/general/docs.png" alt="" />
                <p className="hidden md:block">Documents</p>
            </div>
            </Link>
            <Link to="/">
            <div className={`flex items-center hover:bg-gray-300 p-1 rounded-md cursor-pointer font-semibold gap-5 ${FilterContent==="Link🔗" ? "bg-gray-300" :null}`} onClick={()=>setFilter("Link🔗")}>
                <img className="w-6" src="https://ik.imagekit.io/j3whydwtk/general/link.png" alt="" />
                <p className="hidden md:block">Links</p>
            </div>
          </Link>

         </div>
         <div onClick={Logouthandler} className="flex items-center hover:bg-gray-300 p-1 rounded-md cursor-pointer font-semibold gap-3 bottom-0 mt-20  ">
                <img className="w-8" src="https://ik.imagekit.io/j3whydwtk/general/switch.png" alt="" />
                <p className="hidden md:block">LogOut</p>
            </div>
      </div>
    </div>
  )
}

export default Sidebar