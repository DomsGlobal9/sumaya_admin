// import { Suspense, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { Route, Routes } from 'react-router-dom'

// import AdminDashboard from './Pages/AdminDashboard'
// import AdminLogin from './Pages/AdminLogin'
// function App() {
  

//   return (
//     <>
//       {/* <ScrollToTop /> */}
//       <Suspense fallback={<div>Loading…</div>}>
//         <Routes>
//           <Route path='/' element={<AdminLogin/>}/>
//           <Route path='/admin' element={<AdminDashboard/>}/>
//         </Routes>
//       </Suspense>
//     </>
//   )
// }

// export default App


import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import AdminDashboard from "./Pages/AdminDashboard";
import AdminLogin from "./Pages/AdminLogin";
import PublicRoute from "./Components/PublicRoute";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading…</div>}>
        <Routes>
          {/* Login should be public-only */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <AdminLogin />
              </PublicRoute>
            }
          />

          {/* Admin Dashboard should be private-only */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
