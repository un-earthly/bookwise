import React, { useState } from 'react';

interface Book {
    title: string;
    author: string;
    genre: string;
    publicationDate: string;
}

interface BookCardProps {
    book: Book;
}

const WishlistCard: React.FC<BookCardProps> = ({ book }) => {
    const [isFinishedReading, setIsFinishedReading] = useState(false);
    const [isCurrentlyReading, setIsCurrentlyReading] = useState(false);

    const handleMarkCompleted = () => {
        setIsFinishedReading(!isFinishedReading);
    };

    const handleMarkCurrentlyReading = () => {
        setIsCurrentlyReading(!isCurrentlyReading);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Publication Date: {book.publicationDate}</p>

            <div className="space-x-4">
                <button
                    className={`btn ${isFinishedReading ? 'btn-primary' : 'btn-outline-primary'
                        }`}
                    onClick={handleMarkCompleted}
                >
                    {isFinishedReading ? 'Completed' : 'Mark as Completed'}
                </button>

                <button
                    className={`btn ${isCurrentlyReading ? 'btn-primary' : 'btn-outline-primary'
                        }`}
                    onClick={handleMarkCurrentlyReading}
                >
                    {isCurrentlyReading ? 'Currently Reading' : 'Mark as Currently Reading'}
                </button>
            </div>
        </div>
    );
};

export default WishlistCard;
