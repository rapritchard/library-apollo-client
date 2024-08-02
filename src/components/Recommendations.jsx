import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

export const Recommendations = ({ favouriteGenre, show }) => {
  const booksResult = useQuery(ALL_BOOKS, {
    skip: !favouriteGenre,
    variables: { genre: favouriteGenre },
  });

  if (!show) {
    return null;
  }

  if (booksResult.loading || !booksResult.data?.allBooks) {
    return <div>Loading...</div>;
  }

  const books = booksResult.data.allBooks;

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favourite genre <b>{favouriteGenre}</b>
      </p>
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
