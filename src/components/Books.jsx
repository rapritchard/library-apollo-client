import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

export const Books = ({ show }) => {
  const [getBooks, { data, loading }] = useLazyQuery(ALL_BOOKS);
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreFilter, setGenreFilter] = useState("");

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    // So we don't lose our filters
    const previousGenres = genres;
    if (data && !loading) {
      setBooks(data.allBooks);
      setGenres([
        ...new Set([
          ...previousGenres,
          ...data.allBooks.flatMap((book) => book.genres),
        ]),
      ]);
    }
  }, [loading, data]);

  useEffect(() => {
    getBooks({
      variables: {
        genre: genreFilter,
      },
    });
  }, [genreFilter]);

  if (!show) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>books</h2>
      <div>
        {genres.map((value) => (
          <button
            key={value}
            onClick={() => {
              setGenreFilter(value);
            }}
          >
            {value}
          </button>
        ))}
        <button onClick={() => setGenreFilter("")}>All genres</button>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
