import React from "react";
import Header from "./Header";
import { Container } from "react-bootstrap";
import HomeScreen from "../screens/HomeScreen";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          {/* <HomeScreen /> */}
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
