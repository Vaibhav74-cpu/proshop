import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import MainLayout from "./components/MainLayout";
// import Cart from "./components/Cart";
import Login from "./components/Login";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: "cart", element: <CartScreen /> },
      { path: "login", element: <Login /> },
      { path: "product/:id", element: <ProductScreen /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter}></RouterProvider>;
}

export default App;
