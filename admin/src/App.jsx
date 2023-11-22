import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavigationLayout from "./components/NavigationLayout/NavigationLayout";
import Home from "./pages/Home";
import Bookings from "./pages/Bookings";
import axios from "axios";
import Offices from "./pages/Offices";
import Users from "./pages/Users";
import FormOffices from "./pages/FormOffices";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserContextProvider from "./components/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <UserContextProvider>
        <ToastContainer autoClose={2000} />
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route
            element={
              <PrivateRoute>
                <NavigationLayout />
              </PrivateRoute>
            }
          >
            <Route path="/register" element={<Register />} />
            <Route path="/arjuna/:id" element={<Bookings />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/meetingroom/:id" element={<Bookings />} />
            <Route path="/play-hard/:id" element={<Bookings />} />
            <Route path="/command-center/:id" element={<Bookings />} />
            <Route path="/co-working/:id" element={<Bookings />} />
            <Route path="/offices" element={<Offices />} />
            <Route path="/form-offices" element={<FormOffices />} />
            <Route path="/form-offices/:id" element={<FormOffices />} />
            <Route path="/users" element={<Users />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
