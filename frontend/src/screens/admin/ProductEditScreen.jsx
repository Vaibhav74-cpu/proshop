import React from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import FormContainer from "../../components/FormContainer";
import { useState } from "react";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadImageProductMutation,
} from "../../redux/slices/productApiSlice";
import { useEffect } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";

function ProductEditScreen() {
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);
  // console.log(product);

  const [updateProduct, { isLoading: loadingUpdate, error: errorProduct }] =
    useUpdateProductMutation();

  // const [uploadProductImage, { isLoading: loadingUpload }] =
  //   useUploadImageProductMutation();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(""); // old image for show the url response of cludinary
  const [imageFile, setImageFile] = useState("");
  useEffect(() => {
    if (product) {
      setName(product.name);
      setBrand(product.brand);
      setPrice(product.price);
      setCountInStock(product.countInStock);
      setCategory(product.category);
      setImage(product.image);
      setDescription(product.description);
    }
  }, [product]);

  const updateHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("countInStock", countInStock);
    formData.append("description", description);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // const updatedProduct = {
    //   productId,
    //   name,
    //   price,
    //   brand,
    //   category,
    //   countInStock,
    //   description,
    //   image:imageFile
    // };
    try {
      const res = await updateProduct({ productId, formData }).unwrap();
      refetch();
      // setImage(res.image);
      // console.log(res);
      toast.success("Product Updated");
      navigate("/admin/productList");
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  return (
    <>
      <LinkContainer to="/admin/productlist">
        <Button className="btn-light">Go Back</Button>
      </LinkContainer>
      <FormContainer>
        <h2 className="fw-bold">Edit Product</h2>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Form onSubmit={updateHandler} className="w-75">
              <FormGroup controlId="name" className="my-3 ">
                <Form.Label>Name</Form.Label>
                <FormControl
                  type="text"
                  placeholder="Enter Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId="price" className="my-3">
                <Form.Label>Price</Form.Label>{" "}
                <FormControl
                  type="number"
                  placeholder="Enter Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </FormGroup>
              {/* Image upload */}
              <FormGroup controlId="image" className="my-2">
                <FormLabel>Image</FormLabel>
                <FormControl type="text" name={image} />
                <FormControl
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  label="choose file"
                />
              </FormGroup>
              <FormGroup controlId="brand" className="my-3">
                <Form.Label>Brand</Form.Label>{" "}
                <FormControl
                  type="text"
                  placeholder="Enter Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId="countinstock" className="my-3">
                <Form.Label>Count In Stock</Form.Label>{" "}
                <FormControl
                  type="number"
                  placeholder="Enter Count In Stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId="category" className="my-3">
                <Form.Label>Category</Form.Label>{" "}
                <FormControl
                  type="text"
                  placeholder="Enter Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId="description" className="my-3">
                <Form.Label>Description</Form.Label>{" "}
                <FormControl
                  type="text"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormGroup>
              <Button type="submit" className="btn-block mt-2 bg-dark">
                Update
              </Button>
            </Form>
          </>
        )}
      </FormContainer>
    </>
  );
}

export default ProductEditScreen;
