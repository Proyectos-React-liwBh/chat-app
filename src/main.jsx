import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/CSS/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";

//redux
import { Provider } from "react-redux";
import store from "./Redux/Store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
