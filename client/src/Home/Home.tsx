
import Sidebar from '../Sidebar'
import CreateContent from '../CreateContent'
import { Outlet } from 'react-router-dom'
import { useRecoilValue} from 'recoil'
import { showAtom} from "../Atom"
import ErrorBoundary from '../Error/ErrorBoundary'
import { Suspense } from 'react'

export default function Home() {
     const show=useRecoilValue(showAtom)

  return (
   <>
    {show && <CreateContent/>}
    <div className="flex ">
      <Sidebar/>
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
      </Suspense>
    </ErrorBoundary>
    </div>
    </>
  )
}
