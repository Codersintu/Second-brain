import { useSetRecoilState } from "recoil"
import CrossIcon from "./CrossIcon"
import { showAtom } from "./Atom"


export default function CreateContent() {
  const setshow=useSetRecoilState(showAtom)
  return (
    <div className="w-full h-screen flex justify-center items-center absolute z-20 bg-black/30 ">
      <div className=" w-full max-w-xl bg-white rounded-lg shadow-sm p-5">
          {/* Title */}
          <div className="float-right cursor-pointer hover:bg-cyan-200 p-1 rounded-full" onClick={()=>setshow(false)}><CrossIcon /></div>
          
          <div className="mb-4 mt-5">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              placeholder="Add a title"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Link */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Link</label>
            <input
              type="url"
              placeholder="Add a link"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/*Type  */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Type</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none">
              <option>Twitter</option>
              <option>Youtube</option>
            </select>
          </div>

          <button className="w-full items-center bg-blue-600 py-2 text-white rounded-md">Submit</button>
          </div>
    </div>
  )
}
