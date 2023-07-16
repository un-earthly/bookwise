import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IBook } from '../interface/book.interface';
import { useCreateBookMutation } from '../redux/api/bookApi';

const AddNewBookPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [publicationDate, setPublicationDate] = useState('');

    const navigate = useNavigate();

    const [createBook, { isLoading }] = useCreateBookMutation();

    const handleAddBook = async () => {
        try {
            const newBook: IBook = { title, author, genre, publicationDate };
            const response = await createBook(newBook);
            console.log('Adding new book:', response);
            navigate('/all-books');
        } catch (error) {
            console.error('Error adding new book:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
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

                <button className="btn btn-primary" onClick={handleAddBook} disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Add Book'}
                </button>
            </div>
        </div>
    );
};

export default AddNewBookPage;
