import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDeleteBookMutation, useGetBookByIdQuery } from '../redux/api/bookApi';

const BookDetailsPage: React.FC = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const navigate = useNavigate();
    const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

    const { data: book, isLoading, isError } = useGetBookByIdQuery(String(bookId));

    const handleEditBook = () => {
        navigate(`/edit-book/${bookId}`);
    };

    const handleDeleteBook = async () => {
        if (!book) {
            return;
        }

        try {
            await deleteBook(book._id);
            navigate('/all-books');
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error occurred while fetching book details.</div>;
    }

    if (!book) {
        return <div>Book not found.</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Book Details</h1>
            <div className="space-y-4">
                <h2 className="text-lg font-bold">{book.title}</h2>
                <p>Author: {book.author}</p>
                <p>Genre: {book.genre}</p>
                <p>Publication Date: {book.publicationDate}</p>

                <div className="space-x-4">
                    <button className="btn btn-primary" onClick={handleEditBook}>
                        Edit Book
                    </button>
                    <button className="btn btn-error" onClick={handleDeleteBook} disabled={isDeleting}>
                        {isDeleting ? 'Deleting...' : 'Delete Book'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookDetailsPage;
