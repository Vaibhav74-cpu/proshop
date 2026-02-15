import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, replace, useNavigate } from "react-router-dom";

function PrivateRoutes() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoutes;
