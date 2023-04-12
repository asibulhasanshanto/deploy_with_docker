import { useContext, useEffect } from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";
import { useAccountDispatch, useAccount } from "../../context/AccountContext";

function ProtectedRoute({ children }) {
  const account = useAccount();
  const navigate = useNavigate();
  
  if (!account.account ||  account.account =='null') {
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
}

export default ProtectedRoute;
