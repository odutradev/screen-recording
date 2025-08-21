import { Navigate } from "react-router-dom";

const InitialRoute = () => localStorage.getItem("token") != null ? <Navigate to="/dashboard/general" replace/> : <Navigate to="/signin" />;

export default InitialRoute