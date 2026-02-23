import React, { useState } from "react";
import { Button, Form, FormControl, FormGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function SearchBox() {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");
  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  return (
    <Form onSubmit={searchHandler} className="d-flex my-2">
      <FormGroup controlId="search" className="">
        <FormControl
          type="text"
          name="q"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search product...."
          style={{ marginRight: "25px" }}
        />
      </FormGroup>
      <Button variant="outline-light" type="submit" className="mx-2">
        Search
      </Button>
    </Form>
  );
}

export default SearchBox;
