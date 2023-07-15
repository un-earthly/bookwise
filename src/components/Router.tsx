import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Wishlist from "../pages/Wishlist";
import AllBooksPage from "../pages/AllBooks";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/wishlist",
        element: <Wishlist />,

    },
    {
        path: "/all-books",
        element: <AllBooksPage />,

    },
]);

export default router