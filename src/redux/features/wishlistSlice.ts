import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBook } from '../../interface/book.interface';

interface WishlistState {
    books: IBook[];
}

const initialState: WishlistState = {
    books: [],
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addBookToWishlist(state, action: PayloadAction<IBook>) {
            const book = action.payload;
            if (!state.books.find((wishlistBook) => wishlistBook._id === book._id)) {
                state.books.push(book);
            }
        },
        removeBookFromWishlist(state, action: PayloadAction<string>) {
            const bookId = action.payload;
            state.books = state.books.filter((book) => book._id !== bookId);
        },
    },
});

export const { addBookToWishlist, removeBookFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
