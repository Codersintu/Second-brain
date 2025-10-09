import axios from "axios";
import { BACKEND_URL } from "./Config";
import DeleteIcon from "./DeleteIcon"
import ShareIcon from "./ShareIcon"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { contentAtom, type ContentItem } from "./Atom";

function Card() {
  const content=useRecoilValue(contentAtom)
  const setContent=useSetRecoilState(contentAtom)

  const handleDelete = async (contentId: string) => {
  try {
    await axios.delete(`${BACKEND_URL}/api/v1/content`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      data: { contentId }
    });

    setContent((prev) => prev.filter((item) => item._id !== contentId));
  } catch (error) {
    console.error("Delete failed", error);
    alert("Failed to delete content");
  }
};

  return (
    <>
    {content.map((item:ContentItem)=>(
     <div key={item._id} className="w-72 bg-white shadow-md rounded-xl border p-4 min-h-64">
      <div className="p-0 flex flex-col gap-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {item.type==="Twitter" &&
            <img src="./x.png" alt="twitter" className="w-5 h-5" />
            }
            {item.type ==="Youtube" && <img src="./tube.png" alt="twitter" className="w-7 h-7" />}
            <h2 className="font-semibold">{item.title}</h2>
          </div>
          <div className="flex items-center gap-3 ">
            <a href={item.link} target="_blank"><ShareIcon/></a>
            <div className="" onClick={() => handleDelete(item._id)}><DeleteIcon/></div>
                       
          </div>
        </div>

        {/* Content */}
        {item.type==="Youtube" && 
        <iframe className="w-64 min-h-[150px]" src={item.link.replace("watch","embed")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
        </iframe>}

        {item.type==="Twitter" &&
         <blockquote className="twitter-tweet">
       <a href={item.link.replace("x.com","twitter.com")}></a> 
       </blockquote>}

        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg text-xs">
            #productivity
          </span>
          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg text-xs">
            #learning
          </span>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400">Added on {new Date(item.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
    
     ))}
     </>
  )
}

export default Card