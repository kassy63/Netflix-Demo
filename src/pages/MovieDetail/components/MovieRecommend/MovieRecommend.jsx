import { useParams } from "react-router-dom";
import { Spinner, Alert, Row, Col } from "react-bootstrap";
import { useMovieRecommendQuery } from "../../../../hooks/useMovieRecommend";
import MovieCard from "../../../../common/MovieCard/MovieCard";

const MovieRecommend = () => {
  const { movieId } = useParams();
  const {
    data: recommend,
    isLoading,
    isError,
    error,
  } = useMovieRecommendQuery(movieId);
  console.log("🚀 ~ MovieRecommend ~ recommend:", recommend);

  if (isLoading) {
    return (
      <div className="spinner-area">
        <Spinner
          animation="border"
          variant="danger"
          style={{ width: "3rem", height: "3rem" }}
        />
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  if (recommend.results.length === 0) {
    return <p>추천 영화가 없습니다.</p>;
  }

  return (
    <Row>
      {recommend.results.map((movie, index) => (
        <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
          <MovieCard movie={movie} />
        </Col>
      ))}
    </Row>
  );
};

export default MovieRecommend;
