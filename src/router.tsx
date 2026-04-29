import { createBrowserRouter } from "react-router";
import RootRoute from "./RootRoute.tsx";
import Home from "./Home.tsx";
import ReportIssue from "./ReportIssue.tsx";

export const router = createBrowserRouter([
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
