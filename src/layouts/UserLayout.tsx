import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../redux/features/AuthSlice';
import { useDispatch } from 'react-redux';
const UserLayout = ({ children }: {
    children: ReactNode
}) => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <div className="w-full navbar bg-base-300">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block w-6 h-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2 lg:text-xl font-semibold"><Link to={"/"}>bookwise</Link></div>
                    <div className="navbar-end hidden lg:block">
                        <ul className="menu menu-horizontal">
                            <li>
                                <Link to="/wishlist">Wishlist</Link>
                            </li>
                            <li>
                                <Link to="/all-books">All Books</Link>
                            </li>

                        </ul>
                    </div>
                    <div className="navbar-end hidden lg:flex">
                        <a className="btn">Button</a>
                    </div>
                </div>
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200">

                    <li>
                        <Link to="/wishlist">Wishlist</Link>
                    </li>
                    <li>
                        <Link to="/all-books">All Books</Link>
                    </li>

                    <a className="btn btn-outline">Button</a>
                </ul>
            </div>
        </div>
    )
}


export default UserLayout
