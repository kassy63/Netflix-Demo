import { responsive } from "../../../../../constants/responsive";
import MovieSlider from "../../../../../common/MovieSlider/MovieSlider";
import { useUpcomingMoviesQuery } from "../../../../../hooks/useUpcommingMovies";
import { Alert } from "react-bootstrap";

const UpcomingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <MovieSlider
        title="예정 영화"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default UpcomingMovieSlide;
