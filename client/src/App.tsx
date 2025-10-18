
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './Home/Home'
import Content from './Content'
import Signup from './Signup'
import { RecoilRoot } from 'recoil'
import { startTransition, useEffect } from 'react'

function App() {
  const navigate=useNavigate()
 useEffect(() => {
    const token = localStorage.getItem("token");
    startTransition(() => {
      if (token) navigate("/");
      else navigate("/auth");
    });
  }, []);
 
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
