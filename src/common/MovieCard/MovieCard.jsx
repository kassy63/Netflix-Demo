import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { TbRating18Plus, TbWashDryA } from "react-icons/tb";
import { FaImdb } from "react-icons/fa";
import { GoPersonFill } from "react-icons/go";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, index }) => {
  const { data: genreData } = useMovieGenreQuery();
  const navigate = useNavigate();

  // movie 객체 확인
  console.log(movie);

  // const showGenre = (genreIdList) => {
  //   if (!genreIdList) return [];
  //   const genreNameList = genreIdList.map((id) => {
  //     const genreObj = genreData.find((genre) => genre.id === id);
  //     return genreObj ? genreObj.name : null;
  //   });
  //   return genreNameList
  // };

  const showGenre = (genreIdList) => {
    if (!genreIdList || !genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj ? genreObj.name : null;
    });
    return genreNameList.filter(Boolean); // null이나 undefined를 필터링
  };

  // const showGenre = (genreIdList) => {
  //   if (!genreIdList || !genreData) return [];
  //   return genreIdList
  //     .map((id) => {
  //       const genreObj = genreData.find((genre) => genre.id === id);
  //       return genreObj ? genreObj.name : null;
  //     })
  //     .filter(Boolean); // null이나 undefined를 필터링
  // };

  const handleCardClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      style={{
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
          ")",
      }}
      className="movie-card"
    >
      <div className="overlay">
        <h1>{movie.title}</h1>
        {/* {movie.genre_ids.map((id) => ( */}
        {showGenre(movie.genre_ids).map((genre, index) => (
          <Badge bg="danger" key={index} className="me-1">
            {genre}
          </Badge>
        ))}

        <div>
          <div>
            <FaImdb style={{ color: "yellow", marginRight: "3px" }} />
            {movie.vote_average}
          </div>
          <div>
            <GoPersonFill />
            {movie.popularity}
          </div>
          {/* <div>{movie.adult ? "over18" : "under18"}</div> */}
          <div>
            {movie.adult ? (
              <TbRating18Plus style={{ color: "yellow" }} />
            ) : (
              <TbWashDryA />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
