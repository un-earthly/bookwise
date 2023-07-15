import React from 'react';
import { IBook } from './interface/book.interface';
import Navbar from './components/header';
import BookCard from './components/BookCard';
import Footer from './components/Footer';
const LandingPage: React.FC = () => {
  const books: IBook[] = [
    {
      id: '1',
      title: 'Book 1',
      author: 'Author 1',
      genre: 'Fiction',
      publicationDate: '2023-01-01',
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Top 10 Recently Added Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
