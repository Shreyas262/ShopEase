import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";

import router from "./routes/router";
import store from "./app-store/store";

import './styles/main.scss'

import "react-toastify/dist/ReactToastify.css";

const rootElement =
  document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "Root element not found."
  );
}

createRoot(rootElement).render(
  <StrictMode>
      <Provider store={store}>

        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="light"
        />

        <RouterProvider
          router={router}
        />

      </Provider>
  </StrictMode>
);