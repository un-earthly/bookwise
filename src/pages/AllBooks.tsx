import React, { useState, useEffect } from 'react';
import { useFilterBooksQuery, useGetAllBooksQuery, useSearchBooksQuery } from '../redux/api/bookApi';
import UserLayout from '../layouts/UserLayout';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';
import { IBook } from '../interface/book.interface';
import { addBookToWishlist, removeBookFromWishlist } from '../redux/features/wishlistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const AllBooksPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [genreFilter, setGenreFilter] = useState<string | null>(null);
    const [publicationYearFilter, setPublicationYearFilter] = useState<string | null>(null);
    const [booksData, setBooksData] = useState<IBook[]>([]);

    const searchParams = searchTerm ? searchTerm : undefined;
    const filterParams = {
        genre: genreFilter || undefined,
        year: publicationYearFilter ? parseInt(publicationYearFilter) : undefined,
    };
    const dispatch = useDispatch();
    const wishlist = useSelector((state: RootState) => state.wishlist.books);
    const wishlistMap = wishlist.reduce((acc, book) => {
        acc[book._id!] = true;
        return acc;
    }, {} as Record<string, boolean>);

    const handleAddToWishlist = (book: IBook) => {
        if (!wishlistMap[book._id!]) {
            dispatch(addBookToWishlist(book));
        }
    };

    const handleRemoveFromWishlist = (_id: string) => {
        dispatch(removeBookFromWishlist(_id as string));
    };
    const allBooksQuery = useGetAllBooksQuery(undefined);
    const searchBooksQuery = useSearchBooksQuery({ query: searchParams });
    const filterBooksQuery = useFilterBooksQuery(filterParams);

    useEffect(() => {
        if (searchBooksQuery.data) {
            setBooksData(searchBooksQuery.data.data);
        }
    }, [searchBooksQuery.data]);

    useEffect(() => {
        if (filterBooksQuery.data) {
            setBooksData(filterBooksQuery.data.data);
        }
    }, [filterBooksQuery.data]);

    useEffect(() => {
        if (allBooksQuery.data) {
            setBooksData(allBooksQuery.data.data);
        }
    }, [allBooksQuery.data]);

    return (
        <UserLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">All Books</h1>
                <div className="flex space-x-2 mb-4">
                    <input
                        type="text"
                        placeholder="Search by title or author"
                        className="input w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <select
                        value={genreFilter || ''}
                        onChange={(e) => setGenreFilter(e.target.value || null)}
                        className="select"
                    >
                        <option value="">All Genres</option>
                        {allBooksQuery.data?.data.map((book) => (
                            <option key={book._id} value={book.genre}>
                                {book.genre}
                            </option>
                        ))}
                    </select>

                    <select
                        value={publicationYearFilter || ''}
                        onChange={(e) => setPublicationYearFilter(e.target.value || null)}
                        className="select"
                    >
                        <option value="">All Years</option>
                        {allBooksQuery.data?.data.map((book) => (
                            <option key={book._id} value={formatDate(book.publicationDate)}>
                                {formatDate(book.publicationDate).split('-')[0]}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Genre</th>
                                <th>Publication Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {booksData.map((book) => (
                                <tr key={book._id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.genre}</td>
                                    <td>{formatDate(book.publicationDate)}</td>
                                    <td>
                                        <Link to={`/book-details/${book._id}`} className="btn btn-square px-10 text-xs">
                                            View Details
                                        </Link>
                                    </td>
                                    <td>
                                        {wishlistMap[book._id!] ? (
                                            <button className="btn btn-primary" onClick={() => handleRemoveFromWishlist(book._id!)}>
                                                Remove from Wishlist
                                            </button>
                                        ) : (
                                            <button className="btn btn-accent btn-outline my-4" onClick={() => handleAddToWishlist(book)}>
                                                Add to Wishlist
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Link to="/add-new-book" className="btn btn-outline btn-wide mx-auto my-10">
                Add New Book
            </Link>
            <Footer />
        </UserLayout>
    );
};

export default AllBooksPage;
