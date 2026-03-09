import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "react-toastify/dist/ReactToastify.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { HelmetProvider } from "react-helmet-async";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <GoogleOAuthProvider clientId="1044928015495-9p5glksl4j3cjaf5l824239colaoa8es.apps.googleusercontent.com">
            <App />
          </GoogleOAuthProvider>
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </StrictMode>,
);
