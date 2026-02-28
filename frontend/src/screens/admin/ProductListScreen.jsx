import React from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../redux/slices/productApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify"; // Import toast
import { useParams } from "react-router-dom";
import Paginate from "../../components/Paginate";

function ProductList() {
  const { id: productId, keyword, pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
    keyword,
  });

  const [createProduct, { isLoading: loadingProduct }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation(productId);

  const deleteProductHandler = async (id) => {
    if (window.confirm("Are you sure want to delete this product")) {
      try {
        const res = await deleteProduct(id);
        refetch();
        toast.success(res?.message || res?.data?.message);
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    }
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
        {/* create new product through form */}
        <LinkContainer to="/admin/product/create" className="mx-2">
          <Button className="btn-block bg-dark">
            <FaEdit /> Create New product
          </Button>
        </LinkContainer>

        {/* create sample product */}
        <Button className="btn-block bg-dark" onClick={createProductHandler}>
          <FaEdit /> Create sample product
        </Button>
      </Col>
      {loadingProduct && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
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
                <th>Qty Available</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    {product.countInStock > 0
                      ? product.countInStock
                      : "Out of Stock"}
                  </td>
                  <td className="gap-3">
                    <LinkContainer
                      to={`/admin/product/${product._id}/edit`}
                      className="mx-2"
                    >
                      <Button className="btn-sm" variant="light">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      className="btn-sm"
                      variant="light"
                      onClick={() => deleteProductHandler(product._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            page={data.page}
            pages={data.pages}
            isAdmin={true}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </Row>
  );
}

export default ProductList;
