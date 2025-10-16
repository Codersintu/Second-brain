// CustomHook, but i'm going to use instead of customHook
// import { useEffect, useState } from "react";
// import axios from "axios"
// import { BACKEND_URL } from "../Config";


// export function useFetch(url:string){
//     const [hashed,setHashed]=useState("")

//     async function shareBtn(){
//   const response= await axios.post(url,{
//     share:true
//    },{
//     headers: {
//         Authorization: localStorage.getItem("token"),
//     },
//    })
//    console.log("share link",response.data)
//    console.log("hash:", response.data.hash);
// console.log("id:", response.data._id);

//    const Hash=`${BACKEND_URL}/${response.data.hash}/${response.data._id}`
//    setHashed(Hash)
//    console.log("hashed data",hashed)
//    }

//    return  {hashed,shareBtn}
// }


// export function useDebaunce(value:string,delay:number){
//     const [debounceValue,setDebounceValue]=useState(value)
//     useEffect(()=>{
//         const handler=setTimeout(()=>{
//             setDebounceValue(value)
//         },delay)
//         return ()=>clearTimeout(handler)
//     },[value,delay])
//     return debounceValue
// }
