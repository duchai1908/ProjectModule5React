import { createBrowserRouter } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

const routes = createBrowserRouter([...PublicRoutes,...PrivateRoutes])

export default routes