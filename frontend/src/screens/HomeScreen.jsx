import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../redux/slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

function HomeScreen() {
  const { data: productsList, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader/>
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error?.error}</Message>
      ) : (
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
      )}
    </>
  );
}

export default HomeScreen;
