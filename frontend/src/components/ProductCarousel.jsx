import React from "react";
import { useGetTopProductsQuery } from "../redux/slices/productApiSlice";
import Loader from "./Loader";
import Message from "./Message";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ProductCarousel.css";
function ProductCarousel() {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel
      pause="hover"
      interval={3000}
      controls={true}
      indicators={true}
      wrap={true}
      fade={false}
      prevIcon={<span className="carousel-control-prev-icon custom-prev" />}
      nextIcon={<span className="carousel-control-next-icon custom-next" />}
    >
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`} className="carousel-link">
            <div className="image-wrapper">
              <Image
                src={product.image}
                alt={product.name}
                className="carousel-image"
              />
              <div className="overlay"></div>
            </div>
            <Carousel.Caption className="carousel-caption">
              <h3 className="product-name">{product.name}</h3>
              <div className="product-price">
                <span className="currency">₹</span>
                <span className="amount">{product.price}</span>
              </div>
              <div className="product-rating">
                <span className="stars">
                  {"★".repeat(Math.round(product.rating))}
                </span>
                <span className="rating-count">({product.numReviews})</span>
              </div>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
