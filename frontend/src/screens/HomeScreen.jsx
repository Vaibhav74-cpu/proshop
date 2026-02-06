import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function HomeScreen() {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(`http://localhost:8000/api/products`);
      setProductsList(res.data);
    };
    fetchProducts();
  }, []);
  return (
    <>
      <h1 className="fs-3">Latest Products </h1>
      <Row>
        {productsList.map((product) => (
          <Col
            key={product._id}
            sm={12}
            lg={4}
            md={6}
            xl={3}
            className="d-flex mb-3"
          >
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomeScreen;
