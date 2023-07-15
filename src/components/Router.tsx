import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Wishlist from "../pages/Wishlist";
import AllBooksPage from "../pages/AllBooks";
import BookDetailsPage from "../pages/BookDetailsPage";
import AddNewBookPage from "../pages/AddBook";
import EditBookPage from "../pages/EditBookPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '/wishlist',
        element: <Wishlist />,
    },
    {
        path: '/all-books',
        element: <AllBooksPage />,
    },
    {
        path: '/book-details/:bookId',
        element: <BookDetailsPage />,
    },
    {
        path: '/add-new-book',
        element: <AddNewBookPage />,
    },
    {
        path: '/edit-book/:bookId',
        element: <EditBookPage />,
    },
]);

export default router