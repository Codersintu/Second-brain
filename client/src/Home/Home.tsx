
import Sidebar from '../Sidebar'
import CreateContent from '../CreateContent'
import { Outlet } from 'react-router-dom'
import { useRecoilValue} from 'recoil'
import { showAtom} from "../Atom"
import ErrorBoundary from '../Error/ErrorBoundary'
import { Suspense } from 'react'
import CardSkeleton from '../CardSkeleton'

export default function Home() {
     const show=useRecoilValue(showAtom)

  return (
   <>
    {show && <CreateContent/>}
    <div className="flex ">
      <Sidebar/>
    <ErrorBoundary>
      <Suspense fallback={<div className='grid grid-cols-4 mt-10 card'>
        <CardSkeleton/>
        <CardSkeleton/>
        <CardSkeleton/>
        <CardSkeleton/>
        <CardSkeleton/>
        <CardSkeleton/>
        <CardSkeleton/>
        <CardSkeleton/>
        <CardSkeleton/>
        <CardSkeleton/>
        <CardSkeleton/>
       </div>}>
      <Outlet />
      </Suspense>
    </ErrorBoundary>
    </div>
    </>
  )
}
