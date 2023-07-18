import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IBook } from '../interface/book.interface';
import { useGetBookByIdQuery, useUpdateBookMutation } from '../redux/api/bookApi';
import Input from '../components/Input';
import UserLayout from '../layouts/UserLayout';
import { formatDate } from '../utils/formatDate';
import { showErrorToast, showSuccessToast } from '../utils/toast';

const EditBookPage: React.FC = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const navigate = useNavigate();

    const [book, setBook] = useState<IBook | null>(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [publicationDate, setPublicationDate] = useState('');

    const { data: fetchedBook, isLoading, refetch } = useGetBookByIdQuery(String(bookId));

    const [updateBook] = useUpdateBookMutation();

    useEffect(() => {
        if (fetchedBook) {
            setBook(fetchedBook.data);
            setTitle(fetchedBook.data.title);
            setAuthor(fetchedBook.data.author);
            setGenre(fetchedBook.data.genre);
            setPublicationDate(fetchedBook.data.publicationDate);
        }
    }, [fetchedBook]);

    const handleEditBook = async () => {
        if (!book) {
            return;
        }

        try {
            const editedBook: IBook = { ...book, title, author, genre, publicationDate };
            await updateBook({ bookId, updates: editedBook });
            showSuccessToast("SuccessFully Updated!!")
            refetch()
            navigate(`/book-details/${bookId}`);
        } catch (error) {
            console.error('Error updating book:', error);
            showErrorToast("Failed to update book")
        }
    };

    if (isLoading || !book) {
        return <div>Loading...</div>;
    }

    return (
        <UserLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
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
                            type="text"
                            placeholder="Publication Date"
                            value={formatDate(publicationDate)}
                            onChange={(e) => setPublicationDate(e.target.value)}
                        />
                    </div>

                    <button className="btn btn-primary" onClick={handleEditBook}>
                        Save Changes
                    </button>
                </div>
            </div>
        </UserLayout >

    );
};

export default EditBookPage;
