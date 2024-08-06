import { useState } from "react";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { Authors } from "./components/Authors";
import { Books } from "./components/Books";
import { NewBook } from "./components/NewBook";
import { LoginForm } from "./components/LoginForm";
import { Recommendations } from "./components/Recommendations";
import { ALL_BOOKS, BOOK_ADDED, GET_USER } from "./queries";
import { updateCache } from "./utils";

export const App = () => {
  const client = useApolloClient();
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("authors");
  const userResult = useQuery(GET_USER, {
    skip: !token,
  });

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      alert(`${addedBook.title} added`);
      updateCache(
        client.cache,
        { query: ALL_BOOKS, variables: { genre: "" } },
        addedBook
      );
    },
  });

  const logout = () => {
    setToken(null);
    client.cache.localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return <LoginForm setToken={setToken} />;
  }

  if (userResult.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommend")}>recommend</button>
        <button onClick={() => logout()}>Logout</button>
      </div>

      <Authors show={page === "authors"} />

      <Books
        favouriteGenre={userResult.data.me?.favouriteGenre}
        show={page === "books"}
      />

      <NewBook show={page === "add"} />

      <Recommendations
        favouriteGenre={userResult.data.me?.favouriteGenre}
        show={page === "recommend"}
      />
    </div>
  );
};
