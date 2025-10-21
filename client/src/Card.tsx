import axios from "axios";
import { BACKEND_URL } from "./Config";
import DeleteIcon from "./DeleteIcon"
import ShareIcon from "./ShareIcon"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { contentAtom, filterAtom, type ContentItem } from "./Atom";
import Linkicon from "./Linkicon";
import DocumentIcon from "./DocumentIcon";
import MemoryItem from "./MemoryItem";
import { useEffect } from "react";

function Card() {
  const content = useRecoilValue(contentAtom)
  const setContent = useSetRecoilState(contentAtom)
  const FilterContent = useRecoilValue(filterAtom)

  // ✅ Background refresh on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/content`, {
          headers: { Authorization: localStorage.getItem("token") || "" },
        });
         const data = res.data.contentall || [];
      const sorted = data.sort(
        (a:ContentItem, b:ContentItem) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setContent(sorted);
      localStorage.setItem("cachedContent", JSON.stringify(sorted));
      } catch (error) {
        console.error("Background refresh failed:", error);
      }
    })();
  }, [setContent]);

  const handleDelete = async (contentId: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        data: { contentId }
      });

      setContent((prev) => {
        const updatedContent = prev.filter(item => item._id !== contentId);
        localStorage.setItem("cachedContent", JSON.stringify(updatedContent));
        return updatedContent;
      });
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete content");
    }
  };
  return (
    <>
      {content
        .filter((item) => !FilterContent || item.type === FilterContent)
        .map((item: ContentItem) => (
          <div key={item._id} className="w-72 bg-white  rounded-xl border p-4 min-h-64">
            <div className="p-0 flex flex-col gap-10">
              {/* Header */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {item.type === "Twitter" &&
                    <img src="https://ik.imagekit.io/j3whydwtk/general/x.png" alt="twitter" className="w-5 h-5" />
                  }
                  {item.type === "Youtube" && <img src="https://ik.imagekit.io/j3whydwtk/general/tube.png" alt="twitter" className="w-7 h-7" />}
                  {item.type === "Link🔗" && <Linkicon />}
                  {item.type === "Document📄" && <DocumentIcon />}
                  <h2 className="font-semibold">{item.title}</h2>
                </div>
                <div className="flex items-center gap-3 ">
                  <a href={item.link} target="_blank"><ShareIcon /></a>
                  <div className="" onClick={() => handleDelete(item._id)}><DeleteIcon /></div>

                </div>
              </div>

                  <MemoryItem item={item}/>

              {/* twitter emded */}
              {item.type === "Twitter" &&
                <blockquote className="twitter-tweet">
                  <a href={item.link.replace("x.com", "twitter.com") }></a>
                </blockquote>}

              {/* link uploading system */}

             {item.type === "Link🔗" && <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline truncate"
              >
                {item.link}
              </a>
              }

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