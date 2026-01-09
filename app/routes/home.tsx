import { Navigate } from "react-router";

function home() {
  return <Navigate to="/login" replace />;
}

export default home;
