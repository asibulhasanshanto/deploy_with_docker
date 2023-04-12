import { useContext, useEffect } from "react";
import { Route, Navigate } from "react-router-dom";
import { useAccountDispatch, useAccount } from "../../context/AccountContext";

function ProtectedRoute({ children }) {

  
  const account = useAccount();
  // console.log("account:" + account.account);
  if (account.account == null) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
