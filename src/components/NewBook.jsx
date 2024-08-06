import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from "../queries";
import { updateCache } from "../utils";

export const NewBook = ({ show }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    update: (cache, response) => {
      updateCache(
        cache,
        { query: ALL_BOOKS, variables: { genre: "" } },
        response.data.addBook
      );
    },
  });

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    console.log("add book...");
    createBook({
      variables: { title, author, published: Number(published), genres },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            onChange={({ target }) => setTitle(target.value)}
            value={title}
          />
        </div>
        <div>
          author
          <input
            onChange={({ target }) => setAuthor(target.value)}
            value={author}
          />
        </div>
        <div>
          published
          <input
            onChange={({ target }) => setPublished(target.value)}
            type="number"
            value={published}
          />
        </div>
        <div>
          <input
            onChange={({ target }) => setGenre(target.value)}
            value={genre}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};
