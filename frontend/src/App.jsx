// import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { AccountProvider } from "./context/AccountContext";
import AppProvider from "./context/AppContext";
import LandingPage from "./pages/LandingPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useAccountDispatch } from "./context/AccountContext";

function App() {
  const dispatch = useAccountDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log(storedUser);
    if (storedUser) {
      // console.log("hi");
      dispatch({ type: "SET_ACCOUNT", payload: storedUser });
    }
  }, []);

  return (
    <AppProvider>
      <div className="div">
        <Routes>
          <Route exact path="/" Component={LandingPage} />
          <Route
            exact
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route exact path="/login" Component={Login} />
          <Route exact path="/registration" Component={Registration} />
        </Routes>
      </div>
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
