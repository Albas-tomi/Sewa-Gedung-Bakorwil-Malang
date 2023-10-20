import "./App.css";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserContextProvider from "./components/UserContext";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
