import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDeleteBookMutation, useGetBookByIdQuery, useUpdateBookMutation } from '../redux/api/bookApi';
import UserLayout from '../layouts/UserLayout';
import ReviewCard from '../components/ReviewCard';
import { formatDate } from '../utils/formatDate';
import { getUserFromLocalStorage } from '../utils/localstorage';
import { showErrorToast, showSuccessToast } from '../utils/toast';
const BookDetailsPage: React.FC = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const navigate = useNavigate();
    const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();
    const [updateBook] = useUpdateBookMutation();

    const { data: book, isLoading, isError, refetch } = useGetBookByIdQuery(String(bookId));
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState<number>(1);
    const user = getUserFromLocalStorage()


    const handleEditBook = () => {
        navigate(`/edit-book/${bookId}`);
    };
    const handleDeleteModalOpen = () => {
        setIsDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false);
    };
    const handleDeleteBook = async () => {


        if (!book) {
            return;
        }

        try {
            await deleteBook(book.data._id);
            showSuccessToast("Book deleted successfully")
            navigate('/all-books');
        } catch (error) {
            console.error('Error deleting book:', error);
            showErrorToast("Failed to delete book")

        }
    };

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!review || rating === undefined) {
            return;
        }

        const newReview = {
            rating,
            comment: review,
            by: user.data.username
        };
        try {
            await updateBook({
                bookId: book?.data._id,
                updates: { reviews: [...(book?.data.reviews || []), newReview] },
            });
            showSuccessToast("Review Added Successfully");

        } catch (error) {
            console.error('Error adding review:', error);
            showErrorToast("Failed to add review")
        }
        refetch();
        setReview('');
        setRating(1);
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
        <UserLayout>
            <div className="p-4 ">
                <h1 className="text-2xl font-bold mb-4">Book Details</h1>
                <div className="space-y-4">
                    <h2 className="text-lg font-bold">{book.data.title}</h2>
                    <p>Author: {book?.data?.author}</p>
                    <p>Genre: {book?.data?.genre}</p>
                    <p>Publication Date: {formatDate(book.data?.publicationDate)}</p>
                    <div>
                        <h1 className="font-semibold">Reviews</h1>
                        {book.data.reviews && book.data.reviews?.length > 0 ? book?.data?.reviews.map((review) => <ReviewCard review={review} key={review._id} />) : "Not available"
                        }
                    </div>
                    <div>
                        <h1 className="font-semibold">Add Reviews</h1>
                        {user ? (
                            <form onSubmit={handleReviewSubmit} className="space-y-2 max-w-xl flex-col flex">
                                <label htmlFor="review">Leave Your Message:</label>
                                <textarea
                                    id="review"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    required
                                    className="textarea"
                                />

                                <div className="dropdown dropdown-bottom">
                                    <label tabIndex={0} className="btn m-1">
                                        Rating: {rating}
                                    </label>
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                                    >
                                        {Array.from({ length: 5 }, (_, index) => index + 1).map((option) => (
                                            <li key={option}>
                                                <button
                                                    type="button"
                                                    onClick={() => setRating(option)}
                                                    className="btn btn-xs btn-link"
                                                >
                                                    {option}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Submit Review
                                </button>
                            </form>
                        ) : (
                            <p>Please log in to leave a review.</p>
                        )}
                    </div>

                    <div className="space-x-4">
                        <button className="btn btn-primary" onClick={handleEditBook}>
                            Edit Book
                        </button>
                        <button className="btn btn-error" onClick={handleDeleteModalOpen} disabled={isDeleting}>
                            {isDeleting ? 'Deleting...' : 'Delete Book'}
                        </button>
                    </div>
                </div>
            </div>
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur">
                    <div className="bg-white p-6 rounded shadow-lg max-w-md">
                        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to delete this book?</p>
                        <div className="flex justify-end mt-6 space-x-4">
                            <button
                                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                                onClick={handleDeleteModalClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                                onClick={handleDeleteBook}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </UserLayout>
    );
};

export default BookDetailsPage;
