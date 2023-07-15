import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IBook } from '../interface/book.interface';

const BookDetailsPage: React.FC = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const [book, setBook] = useState<IBook | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fakeBook: IBook = {
            title: 'Book Title',
            author: 'Author Name',
            genre: 'Fiction',
            publicationDate: '2022-01-01',
        };
        setBook(fakeBook);
    }, [bookId]);

    const handleEditBook = () => {
        navigate(`/edit-book/${bookId}`);
    };

    const handleDeleteBook = () => {
        console.log('Deleting book:', bookId);

        navigate('/all-books');
    };

    if (!book) {
        return <div>Loading...</div>;
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
                    <button className="btn btn-error" onClick={handleDeleteBook}>
                        Delete Book
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookDetailsPage;
