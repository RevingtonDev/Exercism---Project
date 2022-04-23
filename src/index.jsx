import React from "react";
import ReactClient from "react-dom/client";

import { App } from "./App";

import "./styles/_global.css";

const root = ReactClient.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
