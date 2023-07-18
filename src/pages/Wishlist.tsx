import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { IBook } from '../interface/book.interface';
import UserLayout from '../layouts/UserLayout';
import WishlistCard from '../components/WishlistCard';

const WishlistPage: React.FC = () => {
    const wishlist = useSelector((state: RootState) => state.wishlist.books);
    const isLoading = false;
    const isError = false;

    return (
        <UserLayout>

            <div className="p-4">
                {isLoading ? (
                    <div>Loading...</div>
                ) : isError ? (
                    <div>Error occurred while fetching wishlist.</div>
                ) : (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
                        {wishlist && wishlist?.length > 0 ? (
                            <ul className="space-y-4">
                                {wishlist.map((book: IBook) => (
                                    <WishlistCard book={book} key={book._id} />
                                ))}
                            </ul>
                        ) : (
                            <p>No books in the wishlist.</p>
                        )}
                    </div>
                )}
            </div>
        </UserLayout>

    );
};

export default WishlistPage;
