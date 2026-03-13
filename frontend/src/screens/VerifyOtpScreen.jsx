import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../constant";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

function VerifyOtpScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setotp] = useState("");
  const { otpEmail } = useSelector((state) => state.auth);
  // console.log(otpEmail);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8000/api/users/verify-email`,
        {
          email: otpEmail,
          otp,
        },
        { withCredentials: true },
      );

      dispatch(setCredentials(res.data));
      toast.success(res.data.message || "Login successful");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.data.message);
    }
  };
  return (
    <FormContainer>
      <h1 className="mt-5 fw-bold">Verify Otp</h1>
      <Form onSubmit={submitHandler} className="w-75">
        <Form.Group className="mb-3">
          {/* <Form.Label className="fw-bold  fs-4">Enter OTP</Form.Label> */}
          <Form.Control
            type="text"
            value={otp}
            placeholder="Enter Otp"
            className="mt-3"
            onChange={(e) => setotp(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="w-100 mb-4" variant="dark">
          Verify OTP
        </Button>
      </Form>
    </FormContainer>
  );
}

export default VerifyOtpScreen;
