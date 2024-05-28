import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/landing-page";
import DetailsPage from "../pages/detail-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/:cioc",
    element: <DetailsPage />,
  },
]);
