import axios from "axios";
import imageCompression from "browser-image-compression";
import { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { showAtom, uploadAtom, type DocumentItem } from "../Atom";
import { BACKEND_URL } from "../Config";
import { useNavigate } from "react-router-dom";
type UploadStatus = "ready" | "uploading" | "success" | "error"

function FileUpload() {
     const setshow = useSetRecoilState(showAtom)
    const [file, setFile] = useState<File | null>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>("ready");
    const [uploadProgress, setUploadProgress] = useState(0);
    const setUploadedDocs=useSetRecoilState(uploadAtom);
    const navigate=useNavigate()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    const handleFileUpload = async () => {
        if (!file) return;
        setUploadStatus("uploading");
        setUploadProgress(0);
        const title = titleRef.current?.value
        const compressedFile = await imageCompression(file, {
            maxSizeMB: 1, // compress to max 1MB
            maxWidthOrHeight: 1920,
            useWebWorker: true
        });
        const formData = new FormData();
        formData.append("file", compressedFile);
        formData.append("title", title || "");
        try {
            const response = await axios.post(`${BACKEND_URL}/upload`,
                formData
                , {
                    headers: {
                        "Authorization": localStorage.getItem("token") || "",
                        "Content-Type": "multipart/form-data"
                    },
                    onUploadProgress: (progressEvent) => {
                        const progress = progressEvent.total ? Math.round((progressEvent.loaded * 100) / progressEvent.total) : 0;
                        setUploadProgress(progress);
                    }
                });
            setUploadedDocs((old) => {
                const updatedlocal = [...old, response.data as DocumentItem]
                localStorage.setItem("cachedFile", JSON.stringify(updatedlocal))
                return updatedlocal;
            });
            setUploadStatus("success");
            setFile(null);
            setUploadProgress(100);
           const time=setTimeout(() => {
                setshow(false);
                navigate("/document")
            }, 1000);
            return () => clearTimeout(time);
        }
        catch (error) {
            console.error("Error uploading file:", error);
            setUploadStatus("error");
            setUploadProgress(0);
        }
    }
    return (
        <div>
            <label className="block text-sm font-medium mb-1">Img Title</label>
            <input
                ref={titleRef}
                type="text"
                placeholder="Add a Img title"
                className="w-full border mb-8 border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
            
            <label className="block text-sm font-medium mb-2">Select File:</label>
            <input className="mb-10" type="file" onChange={handleChange} />
            {uploadStatus === "uploading" &&
                <div style={{ width: "100%", backgroundColor: "#e0e0e0", borderRadius: "5px", marginTop: "10px" }}>
                    <div style={{ width: `${uploadProgress}%`, height: "20px", backgroundColor: "#76c7c0", borderRadius: "5px", textAlign: "center", color: "white" }}>
                        {uploadProgress}%
                    </div>
                </div>
            }
            {file && uploadStatus !== "uploading" && <button className="w-full items-center bg-blue-600 py-2 text-white rounded-md hover:bg-blue-500" onClick={handleFileUpload}>submit</button>}
            {uploadStatus === "uploading" && <h2 className="text-gray-600">Uploading...</h2>}
            {uploadStatus === "success" && <h2 className="text-green-600">Upload Successful!</h2>}
            {uploadStatus === "error" && <h2 className="text-red-600">Upload Failed. Please try again.</h2>}
        </div>
    )
}

export default FileUpload;