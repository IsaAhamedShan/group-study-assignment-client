import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const Private = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation()
  console.log("current location is ",location)
  if (user?.email) {
    return children;
  } else {
    // return <Navigate state={location.pathname} to={location?.pathname? location.pathname : '/signin'} replace></Navigate>;
    return <Navigate state={location.pathname} to={'/signin'} replace></Navigate>;
  }
};

export default Private;
