import React from "react";
import productsList from "../product";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";

function HomeScreen() {
  return (
    <>
      <h1 className="fs-3">Latest Products </h1>
      <Row>
        {productsList.map((product) => (
          <Col key={product._id} sm={12} lg={4} md={6} xl={3} className="d-flex mb-3">
            <Product product={product}/>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomeScreen;
