
import Sidebar from '../Sidebar'
import CreateContent from '../CreateContent'
import { Outlet } from 'react-router-dom'
import { useRecoilValue} from 'recoil'
import {showAtom} from "../Atom"

export default function Home() {
     const show=useRecoilValue(showAtom)
  return (
   <>
    {show && <CreateContent/>}
    <div className="flex ">
    <Sidebar/>
    <Outlet />
    </div>
    </>
  )
}
