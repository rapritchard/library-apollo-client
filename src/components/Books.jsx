import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

export const Books = ({ show }) => {
  const result = useQuery(ALL_BOOKS, {
    skip: !show,
  });

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>

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
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
