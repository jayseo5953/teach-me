import { createBrowserRouter } from "react-router-dom";
import Root from "@/pages/Root";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
