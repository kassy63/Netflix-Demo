import { responsive } from "../../../../../constants/responsive";
import MovieSlider from "../../../../../common/MovieSlider/MovieSlider";
import { useUpcomingMoviesQuery } from "../../../../../hooks/useUpcommingMovies";
import { Alert, Spinner } from "react-bootstrap";

const UpcomingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

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
        title="예정 영화"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default UpcomingMovieSlide;
