import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { toast } from "react-toastify"; // Import toast
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-router-dom";
import { useProfileMutation } from "../redux/slices/usersApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import Loader from "../components/Loader";

function ProfileScreen() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [
    updateProfile,
    { isLoading: loadingProfile, error: updateProfileError },
  ] = useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password did Not match try again");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success(res?.message);
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h3 className="fw-bold">Update Profile</h3>
        <Form onSubmit={updateProfileHandler}>
          <FormGroup controlId="name" className="my-2">
            <FormLabel className="fw-semibold">Update Name </FormLabel>
            <FormControl
              type={name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            />
          </FormGroup>
          <FormGroup controlId="email" className="my-2">
            <FormLabel className="fw-semibold">Update Email </FormLabel>
            <FormControl
              type={email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
          </FormGroup>
          <FormGroup controlId="password" className="my-2">
            <FormLabel className="fw-semibold">Update Password</FormLabel>
            <FormControl
              type={password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
          </FormGroup>
          <FormGroup content="confirmPassword" className="my-2">
            <FormLabel className="fw-semibold">Confirm Password</FormLabel>
            <FormControl
              type={confirmPassword}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter Confirm Password"
            />
          </FormGroup>
          <Button type="submit" className="my-2" variant="dark">
            Update Profile
          </Button>
          {loadingProfile && <Loader />}
        </Form>
      </Col>
      <Col md={9}>column</Col>
    </Row>
  );
}

export default ProfileScreen;
