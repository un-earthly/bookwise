import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-500 p-4 text-white">
            <div className="container mx-auto flex justify-between">
                <div>
                    <Link to="/" className="text-xl font-bold">
                        Book Catalog
                    </Link>
                </div>
                <div>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/" className="hover:underline">
                                All Books
                            </Link>
                        </li>
                        <li>
                            <Link to="/signin" className="hover:underline">
                                Sign In
                            </Link>
                        </li>
                        <li>
                            <Link to="/signup" className="hover:underline">
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
