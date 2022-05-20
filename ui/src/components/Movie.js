export const Movie = ({ movie }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <div>Title: {movie.title}</div>
    <div>Year: {movie.release_date}</div>
    <div>Director: {movie.director}</div>
    <div>Status: {movie.status}</div>
    <br></br>
  </div>
);
