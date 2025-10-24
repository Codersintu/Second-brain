import axios from "axios";
import { atom, selector } from "recoil";
import { BACKEND_URL } from "./Config";

export const showAtom=atom({
    key:"showItem",
    default:false
})
export const showShareAtom=atom({
    key:"showShareItem",
    default:false
})
export const usernameAtom=atom({
    key:"usernameItem",
    default:""
})
export const emailAtom=atom({
    key:"emailItem",
    default:""
})
export const passwordAtom=atom({
    key:"passwordItem",
    default:""
})
export const registerAtom=atom({
    key:"registerItem",
    default:false
})

export const filterAtom=atom({
  key:"filteratom",
  default:""
})


export interface ContentItem {
  _id: string;
  link: string;
  type: string;
  title: string;
  tags: string[];
createdAt: string;
contentId:string
}

export const contentAtom = atom<ContentItem[]>({
  key: "contentAtom",
  default: selector<ContentItem[]>({
    key: "contentAtomSelector",
    get: async () => {
      const token = localStorage.getItem("token");
     if (!token) return []; 
     const cached=localStorage.getItem("cachedContent")
     if (cached) {
        const data = JSON.parse(cached);
        return data.sort(
          (a: ContentItem, b: ContentItem) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/content`, {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        });
        const data = res.data.contentall || [];
        const sorted = data.sort(
          (a: ContentItem, b: ContentItem) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        localStorage.setItem("cachedContent", JSON.stringify(sorted));
        return sorted;
      } catch (error) {
        console.error("Error fetching content:", error);
        return [];
      }
    },
  }),
});


export interface Documentdata {
  _id: string;
  imageUrl: string;
  title: string;
 createdAt: string;
 userId:string
}
export const uploadAtom = atom<Documentdata[]>({
  key: "uploadedAtom",
  default:selector<Documentdata[]>({
   key:"DocumentSelector",
   get:async()=>{
    const token=localStorage.getItem("token")
    if(!token) return []
    const cached=localStorage.getItem("CachedDocument")
    if (cached) {
      const data=JSON.parse(cached)
      return data.sort((a:Documentdata,b:Documentdata)=>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    }

    try {
      const response=await axios.get(`${BACKEND_URL}/my-memories`,{
        headers:{
          Authorization:localStorage.getItem("token")
        }
      })
      console.log("response,dat",response.data)
      const data=response.data.memories;
      console.log(data)
      const sorted=data.sort((a:Documentdata,b:Documentdata)=>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      localStorage.setItem("CachedDocument",JSON.stringify(sorted))
      return sorted;
    } catch (error) {
      console.error("Error fetching content:", error);
        return [];
    }
    
   }
  }) 
});