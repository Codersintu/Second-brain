import axios from "axios";
import { atom, selector } from "recoil";
import { BACKEND_URL } from "./Config";

export const showAtom=atom({
    key:"showItem",
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
     if (!token) return []; // skip call if no token
        // ✅ Try to load cached data first
    const cached = localStorage.getItem("cachedContent");
    if (cached) {
      console.log("Using cached content");
      return JSON.parse(cached) as ContentItem[];
    }
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/content`, {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        });
        const content = res.data.contentall as ContentItem[];
       localStorage.setItem("cachedContent", JSON.stringify(content));
        return content;
      } catch (error) {
        console.error("Error fetching content:", error);
        return [];
      }
    },
  }),
});