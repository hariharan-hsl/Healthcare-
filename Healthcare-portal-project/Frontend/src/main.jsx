import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/style.css";
import "./styles/responsive.css";
import "./styles/hero.css";
import "./styles/doctor.css";
import "./styles/appointment.css";
import "./styles/contact.css";
import "./styles/about.css";
import "./styles/layout.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter><App /></BrowserRouter>
  </React.StrictMode>,
);
