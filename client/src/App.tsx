
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Home/Home'
import Content from './Content'
import Signup from './Signup'
import { RecoilRoot } from 'recoil'

function App() {
 
  return (
    <RecoilRoot>
    <Routes>
    <Route element={<Home/>}>
      <Route path='/' element={<Content/>}/>
    </Route>
    <Route path='/auth' element={<Signup/>}/>
  </Routes>
    </RecoilRoot>
  )
}

export default App
