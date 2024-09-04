import MovieSlider from "../../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../../constants/responsive";
import { useTopRatedMoviesQuery } from "../../../../../hooks/useTopRatedMovies";
import { Alert, Spinner } from "react-bootstrap";

const TopRatedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery();

  if (isLoading) {
    return (
      <div className="spinner-area">
        <Spinner
          animation="border"
          variant="danger"
          style={{ width: "5rem", height: "5rem" }}
        />
      </div>
    );
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <MovieSlider
        title="최고 평점 영화"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default TopRatedMovieSlide;
