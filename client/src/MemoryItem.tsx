import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { showPreviewAtom } from "./Atom";
import { AnimatePresence, motion } from "motion/react";
import CrossIcon from "./CrossIcon";


function MemoryItem({ item }: any) {
  const [loaded, setLoaded] = useState(false);
  const showPreview = useRecoilValue(showPreviewAtom)
  const setShowPreview = useSetRecoilState(showPreviewAtom)
  if (item.type !== "Youtube") return null;

  const match = item.link.match(/(?:v=|youtu\.be\/)([^&]+)/);
  if (!match) return null;
  const videoId = match[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  const isPreviewing = showPreview === item._id;

  return (
    <>
      <div className='relative w-64 min-h-[150px]  rounded-lg shadow-md overflow-hidden'>
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

      <AnimatePresence>
        {isPreviewing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 ml-5 md:ml-0 flex items-center justify-center z-[9999]"
          // click outside closes it
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl p-10"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside video
            >
              <iframe
                className="w-[80vw] h-[45vw] max-w-[800px] max-h-[450px] rounded-xl"
                src={embedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div onClick={() => setShowPreview(null)} className="absolute top-0 right-0 hover:bg-gray-200 rounded-full p-1 cursor-pointer"><CrossIcon /></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MemoryItem;