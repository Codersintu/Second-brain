
import DocumentIcon from "./DocumentIcon";
import ShareIcon from "./ShareIcon";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { uploadAtom, type Documentdata } from "./Atom";
import { BACKEND_URL } from "./Config";
import DeleteIcon from "./DeleteIcon";
import { useEffect } from "react";

function DocumentItem() {
  const setUploadedDocs = useSetRecoilState(uploadAtom);
  const UploadedDocs = useRecoilValue(uploadAtom);
  
  useEffect(() => {
    async function fetchingFileData(){
      const res = await axios.get(`${BACKEND_URL}/my-memories`, {
        headers: {
          Authorization:localStorage.getItem("token"),
        }
      });
      const data=res.data.memories
      const sorted=data.sort((a:Documentdata,b:Documentdata)=>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
     setUploadedDocs(sorted)
     localStorage.setItem("CachedDocument",JSON.stringify(sorted));
    };
    fetchingFileData();
  }, [setUploadedDocs]);


  const handleDelete = async (docsId: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/delete`, {
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: { docsId }
      })
      setUploadedDocs((prev) => {
        const deletedfile = prev.filter(item => item._id !== docsId)
        localStorage.setItem("cachedFile", JSON.stringify(deletedfile))
        return deletedfile;
      })
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete content");
    }
  }
  return (
    <>
      {Array.isArray(UploadedDocs) && UploadedDocs.map((item) => (
        <div key={item._id} className="w-72 bg-gray-300 shadow-md rounded-xl border p-4 min-h-64">
          <div className="p-0 flex flex-col gap-10">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <DocumentIcon />
                <h2 className="font-semibold">{item.title}</h2>
              </div>
              <div className="flex items-center gap-3 ">
                <a href={item.imageUrl} target="_blank"><ShareIcon /></a>
                <div onClick={() => handleDelete(item._id)} className=""><DeleteIcon /></div>

              </div>
            </div>

            <img src={item.imageUrl} alt="" />
            {/* Footer */}
            <p className="text-xs text-gray-400">Added on {new Date(item.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </>
  )
}

export default DocumentItem