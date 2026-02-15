import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import { toast } from "react-toastify"; // Import toast
import Loader from "../components/Loader";

function LoginScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();

      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <FormContainer>
      <h1 className="mt-5 fw-bold">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="email" className="my-3">
          <Form.Label className="fw-medium">Enter Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            className=" w-75"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" className="my-3">
          <Form.Label className="fw-medium">Enter Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Enter your Password"
            className="w-75 "
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button
          type="submit"
          className="mt-2"
          variant="dark"
          disabled={isLoading}
        >
          Sign In
        </Button>
        {isLoading && <Loader />}
        <Row className="py-3 fw-semibold">
          <Col>
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}

export default LoginScreen;
