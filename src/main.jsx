// File path_
import "./index.css";
import router from "./Routes/Routes";

// Package(React router)__
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

// Form react__
import { StrictMode } from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);