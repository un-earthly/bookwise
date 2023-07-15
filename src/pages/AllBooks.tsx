import React, { useState, useEffect } from 'react';
import { IBook } from '../interface/book.interface';
import BookCard from '../components/BookCard';
import UserLayout from '../layouts/UserLayout';

const AllBooksPage: React.FC = () => {
    const [books, setBooks] = useState<IBook[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBooks, setFilteredBooks] = useState<IBook[]>([]);
    const [genreFilter, setGenreFilter] = useState('');
    const [publicationYearFilter, setPublicationYearFilter] = useState('');

    useEffect(() => {
        const fakeBooks: IBook[] = [
            { _id: "1", title: 'Book 1', author: 'Author 1', genre: 'Fiction', publicationDate: '2022-01-01' },
            { _id: "2", title: 'Book 2', author: 'Author 2', genre: 'Non-Fiction', publicationDate: '2021-12-31' },
        ];
        setBooks(fakeBooks);
        setFilteredBooks(fakeBooks);
    }, []);

    useEffect(() => {
        let filtered = books;

        if (searchTerm) {
            filtered = filtered.filter((book) =>
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (genreFilter) {
            filtered = filtered.filter((book) => book.genre === genreFilter);
        }

        if (publicationYearFilter) {
            filtered = filtered.filter((book) =>
                new Date(book.publicationDate).getFullYear().toString() === publicationYearFilter
            );
        }

        setFilteredBooks(filtered);
    }, [searchTerm, genreFilter, publicationYearFilter, books]);

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
                        value={genreFilter}
                        onChange={(e) => setGenreFilter(e.target.value)}
                        className="select"
                    >
                        <option value="">All Genres</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                    </select>

                    <select
                        value={publicationYearFilter}
                        onChange={(e) => setPublicationYearFilter(e.target.value)}
                        className="select"
                    >
                        <option value="">All Years</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                    </select>
                </div>

                <ul className="space-y-4">
                    {filteredBooks.map((book) => <BookCard book={book} key={book._id} />)}
                </ul>
            </div>
        </UserLayout>
    );
};

export default AllBooksPage;
