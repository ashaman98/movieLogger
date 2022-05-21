export const Movie = ({ movie }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <div>Title: {movie.title || movie.Title}</div>
    <div>Year: {movie.release_date || movie.Year}</div>
    <div>Director: {movie.director || movie.Director}</div>
    <div>Status: {movie.status || "not set"}</div>
    <br></br>
  </div>
);
