


import { Suspense ,lazy} from "react";
import { Route, Routes } from "react-router-dom";

// import AdminDashboard from "./Pages/AdminDashboard";
// import AdminLogin from "./Pages/AdminLogin";

const AdminDashboard = lazy(() => import("./Pages/AdminDashboard"));
const AdminLogin = lazy(() => import("./Pages/AdminLogin"))


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
