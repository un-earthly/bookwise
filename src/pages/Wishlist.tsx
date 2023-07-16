import React from 'react';
import { IBook } from '../interface/book.interface';
import UserLayout from '../layouts/UserLayout';
import BookCard from '../components/BookCard';
import { useGetWishlistQuery } from '../redux/api/wishlistApi';

const Wishlist: React.FC = () => {
    const { data: wishlist, isLoading, isError } = useGetWishlistQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error occurred while fetching wishlist.</div>;
    }

    return (
        <UserLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
                {wishlist && wishlist?.length > 0 ? (
                    <ul className="space-y-4">
                        {wishlist.map((book: IBook) => (
                            <BookCard book={book} key={book._id} />
                        ))}
                    </ul>
                ) : (
                    <p>No books in the wishlist.</p>
                )}
            </div>
        </UserLayout>
    );
};

export default Wishlist;
