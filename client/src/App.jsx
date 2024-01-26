import "./App.css";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserContextProvider from "./components/UserContext";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import DetailOffice from "./pages/DetailOffice";
import MyBooking from "./pages/MyBooking";
import DetailBooking from "./pages/DetailBooking";
import Register from "./pages/Register";
import "react-multi-carousel/lib/styles.css";
import WhatsAppsAdmin from "./components/WhatsAppsAdmin";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <WhatsAppsAdmin />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pesanan-saya" element={<MyBooking />} />
          <Route path="/pesanan-saya/:id" element={<DetailBooking />} />
          <Route path="/office/:id" element={<DetailOffice />} />
          <Route path="/kontak-kami" element={<ContactUs />} />
          <Route path="/tentang-kami" element={<AboutUs />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
