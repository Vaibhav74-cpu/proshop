import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

function AdminRoutes() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div>
      {userInfo && userInfo.isAdmin ? (
        <Outlet />
      ) : (
        <Navigate to="/login" replace />
      )}
    </div>
  );
}

export default AdminRoutes;
