import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IBook } from '../interface/book.interface';
import { useCreateBookMutation } from '../redux/api/bookApi';
import Input from '../components/Input';
import UserLayout from '../layouts/UserLayout';
import { parseISO } from 'date-fns';
import { getUserFromLocalStorage } from '../utils/localstorage';
const AddNewBookPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [publicationDate, setPublicationDate] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { data } = getUserFromLocalStorage()
    const navigate = useNavigate();

    const [createBook, { isLoading }] = useCreateBookMutation();

    const handleAddBook = async () => {
        if (!title || !author || !genre || !publicationDate) {
            setError('All fields are required.');
            return;
        }

        try {
            const parsedPublicationDate = parseISO(publicationDate);

            const newBook: IBook = { title, author, genre, publicationDate: String(parsedPublicationDate) };
            const response = await createBook(newBook);
            console.log('Adding new book:', response);
            navigate('/all-books');
        } catch (error) {
            console.error('Error adding new book:', error);
            setError('Error adding new book. Please try again later.');
        }
    };

    useEffect(() => {
        console.log(data)
        if (!data) {
            navigate("/login")
        }
    }, [data])


    return (
        <UserLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
                {error && <div className="text-red-600 mb-4">{error}</div>}
                <div className="space-y-4">
                    <div>
                        <Input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <Input
                            type="text"
                            placeholder="Author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>

                    <div>
                        <Input
                            type="text"
                            placeholder="Genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    </div>

                    <div>
                        <Input
                            type="date"
                            placeholder="Publication Date"
                            value={publicationDate}
                            onChange={(e) => setPublicationDate(e.target.value)}
                        />
                    </div>

                    <button className="btn btn-primary" onClick={handleAddBook} disabled={isLoading}>
                        {isLoading ? 'Adding...' : 'Add Book'}
                    </button>
                </div>
            </div>
        </UserLayout>
    );
};

export default AddNewBookPage;
