import React, { useState } from 'react';
import { useGetAllBooksQuery } from '../redux/api/bookApi';

import BookCard from '../components/BookCard';
import UserLayout from '../layouts/UserLayout';

const AllBooksPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [genreFilter, setGenreFilter] = useState<string | null>(null);
    const [publicationYearFilter, setPublicationYearFilter] = useState<string | null>(null);

    const searchParams = searchTerm ? searchTerm : undefined;
    const filterParams = {
        genre: genreFilter || undefined,
        year: publicationYearFilter ? parseInt(publicationYearFilter) : undefined,
    };

    const { data: books, isLoading, isError } = useGetAllBooksQuery({
        q: searchParams,
        ...filterParams,
        limit: 10,
        page: 1,
    });

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
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                    </select>

                    <select
                        value={publicationYearFilter || ''}
                        onChange={(e) => setPublicationYearFilter(e.target.value || null)}
                        className="select"
                    >
                        <option value="">All Years</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                    </select>
                </div>

                {isLoading ? (
                    <div>Loading...</div>
                ) : isError ? (
                    <div>Error occurred while fetching books.</div>
                ) : (
                    <ul className="space-y-4">
                        {books && books.length > 1 ? books?.map((book) => (
                            <BookCard book={book} key={book._id} />
                        )) : "No Book Available"}
                    </ul>
                )}
            </div>
        </UserLayout>
    );
};

export default AllBooksPage;
