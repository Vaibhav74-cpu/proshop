import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../redux/slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

function HomeScreen() {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber,
    keyword,
  });

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link className="btn btn-light my-3" to="/">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
          <Meta title="Welcome To Online Shop" />
          <h1 className="fs-3 fw-bold mt-3">Latest Products </h1>
          <Row>
            {data.products.map((product) => (
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
          {data.pages > 1 && (
            <Paginate
              page={data.page}
              pages={data.pages}
              keyword={keyword ? keyword : ""}
            />
          )}
        </>
      )}
    </>
  );
}

export default HomeScreen;
