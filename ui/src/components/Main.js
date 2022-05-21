import { useEffect, useState } from "react";
import { Movie } from "./Movie";

const searchMovies = (options) => {
  if (!options.search || !options.user) {
    alert("Fill all fields");
    return;
  }

  return fetch(`http://localhost:3333/movies/${options.search}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${options.user.token}`,
    },
  });
};
const addMovies = (options) => {
  if (!options.movie) {
    alert("search the movie");
    return;
  }
  console.log("Options:", options);
  return fetch(`http://localhost:3333/movies/${options.statusVal}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${options.user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...options.movie,
    }),
  });
};

export const Main = ({ user, setRoute }) => {
  const [search, setSearch] = useState("");
  // {Director: string; Title: string; Year: number; imdbID: string}
  const [movie, setMovie] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchMovies({ search, user })
      .then((res) => res.json())
      .then((res) => setMovie(res));
  };
  const handleLogging = (event, statusVal) => {
    event.preventDefault();
    
    addMovies({ movie, user, statusVal })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="search"
        />
        <input type="submit" value="Submit" />
      </form>
      {movie && <Movie movie={movie} />}
      <button
        onClick={(e) => {
          handleLogging(e, "wishlist")
        }}
      >
        Want To Watch
      </button>
      <button
        onClick={(e) => {
          handleLogging(e, "watched")
        }}
      >
        Watched
      </button>
      <button onClick={() => setRoute("wishlist")}>go to your list</button>
    </div>
  );
};
