import { useState } from "react";
import ShareIcon from "./ShareIcon";
import { showShareAtom } from "./Atom";
import { useSetRecoilState } from "recoil";
import { BACKEND_URL } from "./Config";
import axios from "axios";
import CopyIcon from "./CopyIcon";
import Externallink from "./Externallink";
import { motion } from "motion/react"

export default function ShareYourBrainModal() {
    const [isPublic, setIsPublic] = useState(false);
    const setshowShare = useSetRecoilState(showShareAtom)
    const [hashedlink, setHashedlink] = useState("")
    const [LinkReady, setLinkReady] = useState(false)
    const [loading,setLoading]=useState(false)

    async function generateShareLink() {
        setLoading(true)
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                share: true
            }, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })
            console.log("share link", response.data)
            console.log("hash:", response.data.hash);
            console.log("id:", response.data._id);

            const Hash = `${BACKEND_URL}/brain/${response.data.hash}`
            setHashedlink(Hash)
            setLinkReady(true)
            setIsPublic(true)
        } catch (error) {
            console.log(error)
            return []
        }finally{
            setLoading(false)
        }
    }
    const handleCopy = () => {
        navigator.clipboard.writeText(hashedlink);
    };
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <motion.div initial={{y:100,opacity:0}} animate={{y:0, opacity:1}} transition={{duration:0.5,ease:"easeInOut"}} className="bg-white w-[600px] rounded-2xl shadow-xl p-6 relative">
                {/* Close button */}
                <button
                    onClick={() => setshowShare(false)}
                    className="absolute right-4 top-4 text-gray-500 hover:bg-cyan-200 rounded-full"
                >
                    <img className="w-6" src="https://ik.imagekit.io/j3whydwtk/general/cancel (1).png" />
                </button>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-1">Share Your Brain</h2>
                <p className="text-gray-500 text-sm mb-6">
                    Share your collection with others by generating a shareable link
                </p>

                {/* Section: Share Your Brain */}
                <div className="flex items-center mb-4 gap-4">
                    <ShareIcon />
                    <h3 className="text-2xl font-bold text-gray-900">Share Your Brain</h3>
                </div>

                {/* Enable Public Sharing toggle */}
                <div className="border rounded-xl p-4 mb-5">
                    <div className="flex justify-between items-center">
                        <div className="p-4">
                            <p className="font-bold text-gray-900">Enable Public Sharing</p>
                            <p className="text-gray-500 text-sm">
                                Allow others to view your notes collection through a public link
                            </p>
                        </div>

                        <button
                            onClick={() => setIsPublic(!isPublic)}
                            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${isPublic ? "bg-green-500" : "bg-gray-300"
                                }`}
                        >
                            <div
                                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${isPublic ? "translate-x-6" : ""
                                    }`}
                            />
                        </button>
                    </div>
                </div>

                {/* How sharing works */}
                {!LinkReady ? (
                    <div className="border rounded-xl p-8 mb-6">
                        <p className="font-bold text-gray-900 mb-3">How sharing works:</p>
                        <ul className="text-gray-600 text-sm space-y-2 list-disc list-inside">
                            <li>Enable sharing to generate a unique public link</li>
                            <li>Share the link with friends, colleagues, or on social media</li>
                            <li>Others can view your notes but cannot edit or delete them</li>
                            <li>You can disable sharing at any time</li>
                        </ul>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center border rounded-lg p-2 mb-5">
                            <input
                                value={hashedlink}
                                readOnly
                                className="flex-1 text-sm bg-transparent outline-none"
                            />
                            <button
                                onClick={handleCopy}
                                className="p-2 hover:bg-gray-100 rounded-md"
                            >
                                <CopyIcon />
                            </button>
                            <a
                                href={hashedlink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-gray-100 rounded-md"
                            >
                                <Externallink />
                            </a>
                        </div>

                        {/* What others will see */}
                        <div className="border rounded-lg p-8 bg-gray-50 mb-10">
                            <p className="font-bold text-gray-900 mb-2">What others will see:</p>
                            <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
                                <li>Your username</li>
                                <li>All your public notes and their titles</li>
                                <li>Tags and content types</li>
                                <li>Links to original content</li>
                            </ul>
                        </div>
                    </>
                )}

                {/* Buttons */}
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={() => setshowShare(false)}
                        className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                        Close
                    </button>
                    {!LinkReady ? 
                    <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800" onClick={generateShareLink}>
                        {loading ? "Generating..." : "Generate Share Link"}
                    </button>
                    : null}
                </div>
            </motion.div>
        </div>
    );
}
