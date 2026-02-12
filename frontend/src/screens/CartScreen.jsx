import React from "react";
import {
  Button,
  Card,
  Col,
  FormControl,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";
import { FaTrash } from "react-icons/fa";

function CartScreen() {
  const { cartItems } = useSelector((state) => state.cart);
  //   const cartItems = cart;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h2 style={{ marginBottom: "20px " }}>Shooping Cart</h2>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is Empty <Link to="/">{`Go Back`}</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroupItem key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid />
                  </Col>
                  <Col md={3} style={{ marginTop: "15px" }}>
                    <Link to={`/product/${item?._id}`}>{item?.name}</Link>
                  </Col>
                  <Col md={2} style={{ marginTop: "15px" }}>
                    {item?.price}
                  </Col>
                  <Col md={2}>
                    <FormControl
                      as="select"
                      value={item.qty}
                      onChange={(e) => {
                        addToCartHandler(item, Number(e.target.value));
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </FormControl>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup>
            <ListGroupItem>
              <h2>
                SubTotal {cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                items
              </h2>
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroupItem>
            <ListGroupItem>
              <Button
                type="button"
                variant="dark"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to checkout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
