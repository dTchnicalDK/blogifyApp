import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserContexProvider from "./contexts/UserContexProvider.jsx";
import CategoryContextProvider from "./contexts/CategoryContextProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContexProvider>
      <CategoryContextProvider>
        <App />
      </CategoryContextProvider>
    </UserContexProvider>
  </StrictMode>
);
