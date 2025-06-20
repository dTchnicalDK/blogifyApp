import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserContexProvider from "./contexts/UserContexProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContexProvider>
      <App />
    </UserContexProvider>
  </StrictMode>
);
