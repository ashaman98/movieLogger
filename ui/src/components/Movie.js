export const Movie = ({ movie }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <div>Title: {movie.Title}</div>
    <div>Year: {movie.Year}</div>
    <div>Director: {movie.Director}</div>
  </div>
);
