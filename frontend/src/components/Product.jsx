import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded h-100 w-100">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product?.image}
          variant="top"
          style={{ height: "200px", objectFit: "contain" }}
        />
      </Link>

      <Card.Body className="d-flex flex-column">
        <Link to={`/produts/${product._id}`}></Link>
        <Card.Title
          as="div"
          style={{
            textOverflow: "ellipsis",
            textWrap: "nowrap",
            overflow: "hidden",
          }}
        >
          <strong>{product.name}</strong>
        </Card.Title>

        {/* rating component */}

        <Card.Text as="div">
          <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
        </Card.Text>

        <Card.Text as="h3">{product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
