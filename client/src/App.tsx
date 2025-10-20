
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './Home/Home'
import Signup from './Signup'
import { RecoilRoot } from 'recoil'
import React, { startTransition, useEffect } from 'react'
const Content=React.lazy(()=>import('./Content'))

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
