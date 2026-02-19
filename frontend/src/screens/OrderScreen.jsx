import React from "react";
import {
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
} from "../redux/slices/orderApiSlice";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { toast } from "react-toastify"; // Import toast
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function OrderScreen() {
  const { userInfo } = useSelector((state) => state.auth);
  const { id: orderId } = useParams();
  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const {
    data: paypal,
    isLoading: loadingPaypal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  // console.log(order);

  useEffect(() => {
    if (!errorPayPal && !loadingPaypal && paypal?.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal?.clientId,
            currency: "USD",
            components: "buttons", // Load only buttons component
            "enable-funding": "paylater,card",
          },
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: "pending",
        });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript(); //show paypal button on ui when the client id is present
        }
      }
    }
  }, [errorPayPal, loadingPaypal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) { //on payment successful
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }).unwrap();
        refetch();
        toast.success("Payment Successful");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }
  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("Payment Successful");
  }
  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {//create order with correct amount in paypal
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }
  return (
    <>
      <h2>OrderId {order?._id}</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>Shipping</h2>
                <p>
                  <strong>Name :</strong> {order?.user?.name}
                </p>
                <p>
                  <strong>Email : </strong> {order?.user?.email}
                </p>
                <p>
                  <strong>Address :</strong> {order?.shippingAddress?.address},
                  {order?.shippingAddress?.city},{" "}
                  {order?.shippingAddress?.postalCode},{" "}
                  {order?.shippingAddress?.country}
                </p>
                {order?.isDelivered ? (
                  <Message variant="success">
                    Deliverd on {order?.DeliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not Delivered</Message>
                )}
              </ListGroupItem>
              <ListGroupItem>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method : </strong>
                  {order?.paymentMethod}
                </p>
                {order?.isPaid ? (
                  <Message variant="success">Paid on {order.paidAt}</Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </ListGroupItem>
              <ListGroupItem>
                <h2>Order Items</h2>
                {order?.orderItems?.map((item, index) => (
                  <ListGroupItem key={index}>
                    <Row>
                      <Col md={1}>
                        {" "}
                        {<Image src={item.image} alt={item.name} fluid />}
                      </Col>
                      <Col>
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </Col>
                      <Col>
                        {item.qty} * {item.price} ={" "}
                        {`${(item.qty * item.price).toFixed(2)}`}
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))}
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup>
                <ListGroupItem>
                  <h2>Order Summary</h2>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Items </Col>
                    <Col>{order?.itemsPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>{order?.shippingPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Tax</Col>
                    <Col>{order?.taxPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Total</Col>
                    <Col>{order?.totalPrice}</Col>
                  </Row>
                </ListGroupItem>
                {/* mark as paid */}
                {!order.isPaid && (
                  <ListGroupItem>
                    {loadingPay && <Loader />}
                    {isPending ? (
                      <Loader />
                    ) : (
                      <div>
                        {loadingPaypal && <Loader />}
                        <PayPalScriptProvider
                          options={{
                            clientId: paypal?.clientId,
                            currency: "USD",
                          }}
                        >
                          {/* Test button */}
                          {/* <Button
                            onClick={onApproveTest}
                            style={{ marginBottom: "10px" }}
                            className="bg-dark"
                          >
                            Test Payment Order(mark paid)
                          </Button> */}

                          {/* PayPal buttons */}
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                          />
                        </PayPalScriptProvider>
                      </div>
                    )}
                  </ListGroupItem>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}

export default OrderScreen;
