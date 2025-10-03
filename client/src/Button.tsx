import type { ReactElement } from "react"

type Variants="primary" | "secondary"
type ButtonProps={
    variant:Variants;
    size:"sm" | "md" | "lg";
    text:string;
    startIcon?:ReactElement;
    endIcon?:ReactElement;
    onClick:()=> void;
}
const variantStyles={
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-blue-600 text-white"
}
const sizestyle={
    "sm":"p-2",
    "md":"p-4",
    "lg":"p-6"
}
const defaultStyle="rounded-md"
export const Button=(props:ButtonProps)=>{

 return <button className={`${variantStyles[props.variant]} ${sizestyle[props.size]} ${defaultStyle}`}>{props.text}</button>
}
<Button text={"asd"} variant="primary" size="md" onClick={()=>{}}/>
