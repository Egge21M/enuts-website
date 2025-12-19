import { createRoot } from "react-dom/client";

import "./index.css";
import Home from "./Home.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootRoute from "./RootRoute.tsx";
import ReportIssue from "./ReportIssue.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/report-issue",
        element: <ReportIssue />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
