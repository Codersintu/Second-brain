import { atom } from "recoil";

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

interface ContentItem {
  _id: string;
  link: string;
  type: string;
  title: string;
  tags: string[];
}

export const contentAtom=atom<ContentItem[]>({
    key:"contentitem",
    default:[]
})
