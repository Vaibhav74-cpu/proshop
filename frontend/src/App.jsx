import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import MainLayout from "./components/MainLayout";
// import Cart from "./components/Cart";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PrivateRoutes from "./components/PrivateRoutes";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AdminRoutes from "./components/AdminRoutes";
import OrderListScreen from "./screens/admin/OrderListScreen";
import ProductList from "./screens/admin/ProductList";
import ProductEditScreen from "./screens/admin/ProductEditScreen";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: "product/:id", element: <ProductScreen /> },
      { path: "login", element: <LoginScreen /> },
      { path: "register", element: <RegisterScreen /> },
      {
        element: <PrivateRoutes />,
        children: [
          { path: "shipping", element: <ShippingScreen /> },
          { path: "payment", element: <PaymentScreen /> },
          { path: "cart", element: <CartScreen /> },
          { path: "placeorder", element: <PlaceOrderScreen /> },
          { path: "order/:id", element: <OrderScreen /> },
          { path: "/profile", element: <ProfileScreen /> },
        ],
      },
      {
        element: <AdminRoutes />,
        children: [
          { path: "admin/orderslist", element: <OrderListScreen /> },
          { path: "admin/productlist", element: <ProductList /> },
          {
            path: "admin/product/:id/edit",
            element: <ProductEditScreen />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter}></RouterProvider>;
}

export default App;
