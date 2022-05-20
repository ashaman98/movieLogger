import { useState } from "react";
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
      <button onClick={() => setRoute("wishlist")}>go to wishlist</button>
    </div>
  );
};
