import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";

export const Authors = ({ show }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const result = useQuery(ALL_AUTHORS);

  const [updateAuthor] = useMutation(UPDATE_AUTHOR);

  const handleUpdateAuthor = async () => {
    console.log("update author...");
    updateAuthor({
      variables: { name, setBornTo: Number(born) },
    });
    setName("");
    setBorn("");
  };

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birth year</h2>
      <div>
        <div>
          name
          <select onChange={(e) => setName(e.target.value)} value={name}>
            {authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            onChange={(e) => setBorn(e.target.value)}
            type="number"
            value={born}
          />
        </div>
        <button onClick={() => handleUpdateAuthor()}>Update Author</button>
      </div>
    </div>
  );
};
