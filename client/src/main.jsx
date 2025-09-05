import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserContexProvider from "./contexts/UserContexProvider.jsx";
import CategoryContextProvider from "./contexts/CategoryContextProvider";
import { SidebarProvider } from "./components/ui/sidebar";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SidebarProvider>
      <UserContexProvider>
        <CategoryContextProvider>
          <App />
        </CategoryContextProvider>
      </UserContexProvider>
    </SidebarProvider>
  </StrictMode>
);
