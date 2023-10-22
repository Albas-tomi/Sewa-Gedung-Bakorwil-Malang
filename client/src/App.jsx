import "./App.css";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserContextProvider from "./components/UserContext";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import TodoList from "./todoList/TodoList";
import DetailOffice from "./pages/DetailOffice";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/office/:id" element={<DetailOffice />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
