import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { store } from "./store";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <ToastContainer autoClose={15000} hideProgressBar closeOnClick draggable />
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  rootElement
);
