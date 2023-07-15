import React, { useState, useEffect } from 'react';
import { IBook } from '../interface/book.interface';
import UserLayout from '../layouts/UserLayout';

const Wishlist: React.FC = () => {
    const [wishlist, setWishlist] = useState<IBook[]>([]);

    useEffect(() => {
        const fakeWishlist: IBook[] = [
            {
                _id: "1",
                title: 'Book 1',
                author: 'Author 1',
                genre: 'Fiction',
                publicationDate: '2022-01-01'
            },
            {
                _id: "2",
                title: 'Book 2',
                author: 'Author 2',
                genre: 'Non-Fiction',
                publicationDate: '2021-12-31'
            },
        ];
        setWishlist(fakeWishlist);
    }, []);

    return (
        <UserLayout>

            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
                <ul className="space-y-4">
                    {wishlist.map((book) => (
                        <li key={book.id} className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-lg font-bold">{book.title}</h2>
                            <p>Author: {book.author}</p>
                            <p>Genre: {book.genre}</p>
                            <p>Publication Date: {book.publicationDate}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </UserLayout >

    );
};

export default Wishlist;
