
import Sidebar from '../Sidebar'
import CreateContent from '../CreateContent'
import { Outlet } from 'react-router-dom'
import { useRecoilValue} from 'recoil'
import { showAtom, showShareAtom} from "../Atom"
import ErrorBoundary from '../Error/ErrorBoundary'
import { Suspense } from 'react'
import ShareYourBrainModal from '../ShareYourBrainModal'

export default function Home() {
     const show=useRecoilValue(showAtom)
     const showShare=useRecoilValue(showShareAtom)
 
  return (
   <>
    {show && <CreateContent/>}
    {showShare && <ShareYourBrainModal/>}
    <div className="flex ">
      <Sidebar/>
    <ErrorBoundary>
      <Suspense fallback={<div className='flex justify-center items-center md:px-10 px-1'>Loading...🏃‍♂️‍➡️</div>}>
      <Outlet />
      </Suspense>
    </ErrorBoundary>
    </div>
    </>
  )
}
