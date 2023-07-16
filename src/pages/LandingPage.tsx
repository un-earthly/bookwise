import BookCard from '../components/BookCard';
import Footer from '../components/Footer';
import { IBook } from '../interface/book.interface';
import UserLayout from '../layouts/UserLayout';
import { useGetAllBooksQuery } from '../redux/api/bookApi';

export default function LandingPage() {
  const { data, isLoading, isError } = useGetAllBooksQuery({ limit: 10, page: 1 });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching books.</div>;
  }

  return (
    <UserLayout>
      <div>
        <h2>Top 10 Recently Added Books</h2>
        {data && data.length > 0 ? (
          <ul>
            {data
              ?.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
              .map((book:IBook) => (
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
