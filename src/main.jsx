import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import createMockServer from "@/services/api/mockServer";
import { RouterProvider } from "react-router-dom";
import router from "@/router";
import AuthProvider from "@/contexts/AuthContext";

if (import.meta.env.MODE === "development") {
  createMockServer();
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
