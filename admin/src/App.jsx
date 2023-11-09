import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavigationLayout from "./components/NavigationLayout/NavigationLayout";
import Home from "./pages/Home";
import Bookings from "./pages/Bookings";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavigationLayout />}>
          <Route index element={<Home />} />
          <Route path="/arjuna/:id" element={<Bookings />} />
          <Route path="/meetingroom/:id" element={<Bookings />} />
          <Route path="/play-hard/:id" element={<Bookings />} />
          <Route path="/command-center/:id" element={<Bookings />} />
          <Route path="/co-working/:id" element={<Bookings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
