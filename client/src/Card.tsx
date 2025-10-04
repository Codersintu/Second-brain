import DeleteIcon from "./DeleteIcon"
import ShareIcon from "./ShareIcon"

type Cardprops={
  link:string,
  title:string,
  type:"twitter" | "youtube"
}
function Card({ link, title, type }: Cardprops) {
  return (
     <div className="w-72 bg-white shadow-md rounded-xl border p-4 min-h-64">
      <div className="p-0 flex flex-col gap-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {type==="twitter" &&
            <img src="./x.png" alt="twitter" className="w-5 h-5" />
            }
            {type ==="youtube" && <img src="./tube.png" alt="twitter" className="w-7 h-7" />}
            <h2 className="font-semibold">{title}</h2>
          </div>
          <div className="flex items-center gap-3 ">
            <a href={link} target="_blank"><ShareIcon/></a>
            <DeleteIcon/>
          </div>
        </div>

        {/* Content */}
        {type==="youtube" && 
        <iframe className="w-64 min-h-[150px]" src={link.replace("watch","embed")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
        </iframe>}

        {type==="twitter" &&
         <blockquote className="twitter-tweet">
       <a href={link.replace("x.com","twitter.com")}></a> 
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
        <p className="text-xs text-gray-400">Added on 08/03/2024</p>
      </div>
    </div>
  )
}

export default Card