import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setCredentials } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import Loader from "./Loader";

function AuthGitHubSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      try {
        // Decode JWT token
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const userData = JSON.parse(atob(base64));

        // Store in Redux
        dispatch(
          setCredentials({
            _id: userData.id,
            name: userData.name,
            email: userData.email,
          }),
        );

        toast.success("Login successful through GitHub");
        navigate("/"); // Redirect to home page
      } catch (error) {
        toast.error("Authentication failed");
        navigate("/login");
      }
    } else {
      toast.error("No token received");
      navigate("/login");
    }
  }, [location, dispatch, navigate]);

  return <Loader />;
}

export default AuthGitHubSuccess;
