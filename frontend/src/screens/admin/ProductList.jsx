import React from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from "../../redux/slices/productApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify"; // Import toast

function ProductList() {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [createProduct, { isLoading: loadingProduct }] =
    useCreateProductMutation();

  const trashHandler = async (productId) => {
    console.log("trash", productId);
  };

  const createProductHandler = async () => {
    if (window.confirm("Are you want to create new product")) {
      try {
        await createProduct().unwrap();
        refetch();
      } catch (error) {
        toast.error(error?.data?.Message || error?.Message);
      }
    }
  };

  return (
    <Row>
      <Col>
        <h1 className="fw-bold">Products</h1>
      </Col>
      <Col className="text-end">
        <Button className="btn-block bg-dark" onClick={createProductHandler}>
          <FaEdit /> Create product
        </Button>
      </Col>
      {loadingProduct && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table responsive hover striped bordered className="text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td className="gap-3">
                    <LinkContainer
                      to={`/admin/product/${product._id}/edit`}
                      className="mx-2"
                    >
                      <Button className="bg-dark btn-sm">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      className="bg-dark btn-sm"
                      onClick={() => trashHandler(product._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Row>
  );
}

export default ProductList;
