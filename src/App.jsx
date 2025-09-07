import { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from "./Pages/LoginPage"
import AdminDashboard from './Pages/AdminDashboard'
function App() {
  

  return (
    <>
      {/* <ScrollToTop /> */}
      <Suspense fallback={<div>Loading…</div>}>
        <Routes>
          {/* <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="*" element={<NotFound />} />
          </Route> */}
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/admin' element={<AdminDashboard/>}/>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
