import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../redux/slices/usersApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function UserEditScreen() {
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);
  //   console.log(user);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();
  //   console.log(updateUser);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const updateUserHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser({ userId, name, email, isAdmin }).unwrap();
      refetch();
      navigate("/admin/userslist");
      toast.success("User updated successfully!");
      //   toast.success(res?.data?.message || res?.message);
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };
  return (
    <>
      <LinkContainer to="/admin/userslist">
        <Button className="btn-light">Go Back</Button>
      </LinkContainer>
      <FormContainer>
        <h2 className="fw-bold">Edit User</h2>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.error}</Message>
        ) : (
          <>
            <Form onSubmit={updateUserHandler} className="w-75">
              <FormGroup controlId="name" className="my-3 ">
                <FormLabel>Name</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId="email" className="my-3">
                <FormLabel>Email</FormLabel>{" "}
                <FormControl
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>

              <Form.Group controlId="isAdmin" className="my-2">
                <FormCheck
                  type="checkbox"
                  label="is Admin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                ></FormCheck>
              </Form.Group>

              <Button type="submit" className="btn-block mt-2 bg-dark">
                Update
                {loadingUpdate && <Loader />}
              </Button>
            </Form>
          </>
        )}
      </FormContainer>
    </>
  );
}

export default UserEditScreen;
