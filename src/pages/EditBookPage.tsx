import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IBook } from '../interface/book.interface';


const EditBookPage: React.FC = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const [book, setBook] = useState<IBook | null>(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [publicationDate, setPublicationDate] = useState('');

    const navigate = useNavigate();


    useEffect(() => {
        const fakeBook: IBook = {
            title: 'Book Title',
            author: 'Author Name',
            genre: 'Fiction',
            publicationDate: '2022-01-01',
        };
        setBook(fakeBook);
        setTitle(fakeBook.title);
        setAuthor(fakeBook.author);
        setGenre(fakeBook.genre);
        setPublicationDate(fakeBook.publicationDate);
    }, [bookId]);

    const handleEditBook = () => {
        const editedBook: IBook = { ...book!, title, author, genre, publicationDate };
        console.log('Editing book:', editedBook);
        navigate(`/book-details/${bookId}`);
    };

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    className="input w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Author"
                    className="input w-full"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Genre"
                    className="input w-full"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Publication Date"
                    className="input w-full"
                    value={publicationDate}
                    onChange={(e) => setPublicationDate(e.target.value)}
                />

                <button className="btn btn-primary" onClick={handleEditBook}>
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default EditBookPage;
