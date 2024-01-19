import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AOSWrapper from "./Context/aos.tsx";
import { Provider } from "react-redux";
import { store } from '../Redux/Store.tsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AOSWrapper>
        <App />
      </AOSWrapper>
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
