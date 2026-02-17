import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Form, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Col, FormCheck, FormGroup, FormLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../redux/slices/cartSlice";

function PaymentScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <FormContainer>
      {<CheckoutSteps step1 step2 step3 />}
      <h1 className="fw-bold">Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <FormLabel as="legend" className="fs-5">
            Select Method
          </FormLabel>
          <Col>
            <FormCheck
              type="radio"
              name="paymentMethod"
              value="PayPal"
              id="PayPal"
              label="PayPal or Credit card"
              checked={paymentMethod === "PayPal"}
              className="my-2"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></FormCheck>
          </Col>
          {/* <Col>
            <FormCheck
              type="radio"
              name="paymentMethod"
              value="PayPal"
              id="PayPal"
              label="stripe"
              className="my-2"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></FormCheck>
          </Col> */}
        </FormGroup>
        <Button type="submit" variant="dark" className="mt-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
