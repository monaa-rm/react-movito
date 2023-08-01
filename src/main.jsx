import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import store from "./app/store";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";


const helmetContext = {};
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider context={helmetContext}>
      <Provider store={store}>
        <RouterProvider router={routes}>
          <App />
        </RouterProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
