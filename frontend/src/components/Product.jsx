import React from "react";
import { Card } from "react-bootstrap";

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded h-100 w-100">
      <a href={`/product/${product._id}`}>
        <Card.Img
          src={product?.image}
          variant="top"
          style={{ height: "200px", objectFit: "contain" }}
        />
      </a>

      <Card.Body className="d-flex flex-column">
        <a href={`/produts/${product._id}`}></a>
        <Card.Title as="div">
          <strong>{product.name}</strong>
        </Card.Title>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
