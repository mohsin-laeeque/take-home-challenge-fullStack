import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn.value);
  console.log("isLoggedIn", isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
