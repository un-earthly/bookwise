import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { IBook } from '../interface/book.interface';
import { addBookToWishlist, removeBookFromWishlist } from '../redux/features/wishlistSlice';
import { Link } from 'react-router-dom';

type Props = {
    book: IBook;
};

const BookCard: React.FC<Props> = ({ book }) => {
    const dispatch = useDispatch();
    const wishlist = useSelector((state: RootState) => state.wishlist.books);

    const handleAddToWishlist = () => {
        if (!wishlist.find((wishlistBook) => wishlistBook._id === book._id)) {
            dispatch(addBookToWishlist(book));
        }
    };

    const handleRemoveFromWishlist = () => {
        dispatch(removeBookFromWishlist(book._id as string));
    };

    const isBookInWishlist = wishlist.find((wishlistBook) => wishlistBook._id === book._id);

    return (
        <Link to={"book-details/" + book._id}>
            <div className="border rounded-lg p-4 mb-4">
                <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                <p>Author: {book.author}</p>
                <p>Genre: {book.genre}</p>
                <p>Publication Date: {book.publicationDate}</p>
                {isBookInWishlist ? (
                    <button className="btn btn-primary" onClick={handleRemoveFromWishlist}>
                        Remove from Wishlist
                    </button>
                ) : (
                    <button className="btn btn-accent btn-outline my-4" onClick={handleAddToWishlist}>
                        Add to Wishlist
                    </button>
                )}
            </div>
        </Link>
    );
};

export default BookCard;
