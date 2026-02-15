import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Form, useNavigate } from "react-router-dom";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../redux/slices/cartSlice";

function ShippingScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <FormContainer className="">
      <h1 className="my-5 fw-bold">Shipping</h1>
      <Form onSubmit={submitHandler} className="w-75 fw-medium ">
        <FormGroup className="my-3" controlId="address">
          <FormLabel>Enter Address</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="my-3" controlId="city">
          <FormLabel>Enter city</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="my-3" controlId="postalCode">
          <FormLabel> Enter Postal Code</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter your Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="my-3" controlId="country">
          <FormLabel> Enter your country</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter your country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </FormGroup>
        <Button type="submit" variant="dark">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
