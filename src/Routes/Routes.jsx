import { createBrowserRouter } from "react-router";
import Main from "../Main/Main";
import Error from "../Components/Error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error></Error>,
    element: <Main></Main>,
  },
]);

export default router;