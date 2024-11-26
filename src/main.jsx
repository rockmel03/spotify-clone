import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DataLayer } from "./context/DataLayer.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataLayer>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </DataLayer>
  </StrictMode>
);
