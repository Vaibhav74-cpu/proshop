import React from "react";
import FormContainer from "../../components/FormContainer";
import { LinkContainer } from "react-router-bootstrap";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useState } from "react";
import { useCreateNewProductMutation } from "../../redux/slices/productApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

function AddProductForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [createNewProduct, { isLoading, error }] =
    useCreateNewProductMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!image) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name); //"name" field is read by backend
    formData.append("price", price);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("countInStock", countInStock);
    formData.append("description", description);
    formData.append("image", image);
    const res = await createNewProduct(formData).unwrap();
    if (res.error) {
      toast.error(
        res.error.data.message ||
          res.error?.message ||
          "error while product creating",
      );
    } else {
      navigate("/admin/productlist");
      toast.success(
        res.data?.message || res?.message || "Add New product successfully",
      );
    }
  };

  const uploadImageHandler = (e) => {};
  return (
    <FormContainer>
      <h2>Add New Product</h2>
      <LinkContainer to="/admin/productlist">
        <Button variant="light" className="mb-3">
          ← Go Back
        </Button>
      </LinkContainer>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.error}</Message>
      ) : (
        <Form onSubmit={submitHandler} className="w-75">
          <FormGroup controlId="name" className="my-3 ">
            <Form.Label>Name</Form.Label>
            <FormControl
              type="text"
              placeholder="Enter Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup controlId="price" className="my-3">
            <Form.Label>Price</Form.Label>{" "}
            <FormControl
              type="number"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </FormGroup>

          {/* Image upload */}
          <FormGroup controlId="image" className="my-2">
            <FormLabel>Image</FormLabel>
    
            <FormControl
              type="file"
              // value={image}
              onChange={(e) => setImage(e.target.files[0])}
              label="choose file"
              required
            />
          </FormGroup>
          <FormGroup controlId="brand" className="my-3">
            <Form.Label>Brand</Form.Label>{" "}
            <FormControl
              type="text"
              placeholder="Enter Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup controlId="countinstock" className="my-3">
            <Form.Label>Count In Stock</Form.Label>{" "}
            <FormControl
              type="number"
              placeholder="Enter Count In Stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup controlId="category" className="my-3">
            <Form.Label>Category</Form.Label>{" "}
            <FormControl
              type="text"
              placeholder="Enter Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup controlId="description" className="my-3">
            <Form.Label>Description</Form.Label>{" "}
            <FormControl
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </FormGroup>
          <Button type="submit" className="btn-block mt-2 bg-dark">
            Add New Product
          </Button>
        </Form>
      )}
    </FormContainer>
  );
}

export default AddProductForm;
