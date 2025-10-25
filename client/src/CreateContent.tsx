import { useSetRecoilState } from "recoil"
import CrossIcon from "./CrossIcon"
import { contentAtom, showAtom, type ContentItem } from "./Atom"
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "./Config";
import { motion } from "motion/react"
import FileUpload from "./fileupload/FileUpload";
export default function CreateContent() {
  const setshow = useSetRecoilState(showAtom)
  const titleRef = useRef<HTMLInputElement>(null);
  const linkref = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const setContent = useSetRecoilState(contentAtom)
  const [loadable, setloadable] = useState(false)
  const [selectType, setSelectType] = useState("")

  async function Createcontent(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const title = titleRef.current?.value
    const link = linkref.current?.value
    const type = selectRef.current?.value
    if (!title || !link || !type) {
      alert("plese fill all creadentials!")
    }
    setloadable(true)
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/content`, { title, type, link }, {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      })
      const newItem =
      response.data.content ||
      response.data.newContent ||
      (response.data.contentall && response.data.contentall[0]);

    if (!newItem || !newItem._id) {
      console.error("Backend didn’t return full item:", response.data);
      alert("Server did not return content item");
      return;
    }
      setContent((old: ContentItem[]) => {
        const updated = [newItem as ContentItem,...old];
        localStorage.setItem("cachedContent", JSON.stringify(updated));
        return updated
      });
       setshow(false)
    } catch (error) {
      alert("content create Failed")
    } finally {
      setloadable(false);
    }

  }

  return (

    <div className="w-full h-screen flex justify-center items-center absolute z-20 bg-black/30 ">
      <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeInOut" }} className="relative w-full max-w-xl bg-white rounded-lg shadow-sm p-5">
        {/* Title */}
        <div className="w-8 h-8 absolute right-0 top-0 flex items-center justify-center cursor-pointer hover:bg-cyan-200 rounded-full" onClick={() => setshow(false)}><CrossIcon /></div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Type</label>
          <select ref={selectRef} onChange={(e) => setSelectType(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none">
            <option>Youtube</option>
            <option>Twitter</option>
            <option>Link🔗</option>
            <option>Document📄</option>
          </select>
        </div>

        {selectType !== "Document📄" && <div className="mb-4 mt-5">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            ref={titleRef}
            type="text"
            placeholder="Add a title"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>}

        {/* Link */}
        {selectType === "Document📄" ? <div className="mb-8"><FileUpload /></div> :
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Link</label>
            <input
              ref={linkref}
              type="url"
              placeholder="Add a link"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>
        }
        {selectType !== "Document📄" && <button onClick={Createcontent} className={`w-full items-center bg-blue-600 py-2 text-white rounded-md hover:bg-blue-500 ${loadable ? "cursor-not-allowed opacity-50" : ""}`}> {loadable ? "Submit Content🏃‍♂️‍➡️..." : "Submit"}</button>}
      </motion.div>
    </div>
  )
}
