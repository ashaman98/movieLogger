import { useEffect, useState } from "react";
import { Movie } from "./Movie";

const requestWishlist = (options) => {
  if (!options.user) {
    alert("Fill all fields");
    return;
  }
  console.log('here: ', options)

  return fetch(`http://localhost:3333/movies/user/list`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${options.user.token}`,
    },
  });
};

export const Wishlist = ({ user, setRoute }) => {
  const [movies, setMoview] = useState([]);
  useEffect(() => {
    requestWishlist({ user })
      .then((res) =>  res.json())
      .then((res) =>  setMoview(res));
  }, [user]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {movies.map((movie) => (
        <Movie movie={movie} />
      ))}
      <button onClick={() => setRoute("main")}>go to search</button>
    </div>
  );
};
