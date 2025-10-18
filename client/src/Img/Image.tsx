import { IKImage } from "imagekitio-react"
function Image({src, alt, w, h}:any) {
  return (
    <IKImage urlEndpoint="https://ik.imagekit.io/j3whydwtk"
     src={src}
     transformation={[{
       height: h,
       width: w
     }]}
     alt={alt}
     loading="lazy"
     className='rounded-lg object-cover w-full h-full'
     lqip={{active: true, quality: 20}}
     />
  )
}

export default Image;