import { useState } from "react";


function MemoryItem({ item }:any) {
  const [loaded, setLoaded] = useState(false);

  if (item.type !== "Youtube") return null;

  const match = item.link.match(/(?:v=|youtu\.be\/)([^&]+)/);
  if (!match) return null;
  const videoId = match[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="relative w-64 min-h-[150px] rounded-lg shadow-md overflow-hidden">
      {!loaded && (
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt="YouTube Thumbnail"
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => setLoaded(true)}
        />
      )}
      {loaded && (
        <iframe
          className="w-full h-full"
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}

export default MemoryItem;