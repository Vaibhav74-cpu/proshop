import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Footer() {
  const currentYr = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3 ">
            <p>ProShop &copy; {currentYr}</p>
            <h6>created by - vaibhav borkar</h6>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
