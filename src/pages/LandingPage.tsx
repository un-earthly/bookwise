import BookCard from '../components/BookCard';
import Footer from '../components/Footer';
import { IBook } from '../interface/book.interface';
import UserLayout from '../layouts/UserLayout';
import { useGetAllBooksQuery } from '../redux/api/bookApi';
import { useState, useEffect } from "react"

export default function LandingPage() {
  const { data, isLoading, isError } = useGetAllBooksQuery(undefined);
  const [sortedBooks, setSortedBooks] = useState<IBook[]>([]);

  useEffect(() => {
    if (data) {
      const sortedData = [...data.data].sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
      setSortedBooks(sortedData);
    }
  }, [data]);

  return (
    <UserLayout>
      <div>
        <h2 className='text-center font-semibold lg:text-3xl my-10'>Top 10 Recently Added Books</h2>
        {isLoading ? (
          <div>Loading</div>
        ) : isError ? (
          <div>Error occurred while fetching books.</div>
        ) : data && data.data.length > 0 ? (
          <ul>
            {sortedBooks.map((book: IBook) => (
              <BookCard key={book._id} book={book} />
            ))}
          </ul>
        ) : (
          <p>No books available.</p>
        )}
      </div>
      <Footer />
    </UserLayout>
  );
}
