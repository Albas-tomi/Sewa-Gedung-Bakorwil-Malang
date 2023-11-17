import { useContext } from "react";
import { UserContext } from "./UserContext";

const PrivateRoute = ({ children }) => {
  const { user, setUser } = useContext(UserContext);
  if (user) {
    return children;
  } else {
    return "NOT FOUND";
  }
};

export default PrivateRoute;
