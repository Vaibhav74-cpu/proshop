import React from "react";
import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        margin: "auto",
        width: "60px",
        height: "60px",
        display: "block",
      }}
    />
  );
}

export default Loader;
