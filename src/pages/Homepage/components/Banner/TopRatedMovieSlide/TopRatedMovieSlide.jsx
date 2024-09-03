import MovieSlider from "../../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../../constants/responsive";
import { useTopRatedMoviesQuery } from "../../../../../hooks/useTopRatedMovies";
import { Alert } from "react-bootstrap";

const TopRatedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery();

  if (isLoading) {
    return <h1>Loading</h1>;
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
