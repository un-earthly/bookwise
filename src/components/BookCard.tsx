const BookCard: React.FC<Props> = ({ book }) => {
    return (
        <div className="border rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Publication Date: {book.publicationDate}</p>
        </div>
    );
};
export default BookCard