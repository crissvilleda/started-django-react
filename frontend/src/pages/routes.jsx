import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./home";
import PrivateRoute from "./PrivateRoute";
import Login from "./login";
import NotFound from "./404";

// Pages
import UserRoutes from "./user";

// Styles
import "react-toastify/dist/ReactToastify.min.css";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/*"
          element={
            <PrivateRoute>
              <UserRoutes />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </>
  );
}
