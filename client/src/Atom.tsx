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

interface User {
  username: string;
  email: string;
  password: string;
  _id: string;
  __v: number;
}

interface ApiResponse {
  message: string;
  user: User;
}

export const dataInfoAtom = atom<ApiResponse | null>({
  key: "dataInfoAtom",
  default: null,
});
