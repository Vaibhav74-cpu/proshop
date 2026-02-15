import React from "react";
import Header from "./Header";
import { Container } from "react-bootstrap";
import HomeScreen from "../screens/HomeScreen";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // You can also keep it here

function MainLayout() {
  return (
    <>
      <Header />

      <main className="py-3">
        <ToastContainer/>
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
