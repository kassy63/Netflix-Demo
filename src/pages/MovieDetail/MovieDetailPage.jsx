import { useParams } from "react-router-dom";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import { Badge, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { FaImdb } from "react-icons/fa";
import { TbRating18Plus, TbWashDryA } from "react-icons/tb";
import { GoPersonFill } from "react-icons/go";
import React, { useState } from "react";
import "./MovieDetailPage.style.css";
import MovieVideos from "./components/MovieVideos/MovieVideos";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import MovieRecommend from "./components/MovieRecommend/MovieRecommend";
import { useMovieReviewsQuery } from "../../hooks/useMovieReviews";
import { useMovieRecommendQuery } from "../../hooks/useMovieRecommend";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const {
    data: movieDetail,
    isLoading,
    isError,
    error,
  } = useMovieDetailQuery(movieId);

  // movieDetail 데이터 확인
  console.log("🚀 ~ MovieDetailPage ~ movieDetail:", movieDetail);

  const {
    data: reviews,
    isLoading: isReviewsLoading,
    isError: isReviewsError,
  } = useMovieReviewsQuery(movieId);

  const {
    data: recommend,
    isLoading: isRecommendLoading,
    isError: isRecommendError,
  } = useMovieRecommendQuery(movieId);

  // 컴포넌트 상태 관리를 위한 useState 훅
  const [activeComponent, setActiveComponent] = useState("reviews");

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
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col lg={4} xs={12}>
          <img
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movieDetail.poster_path}`}
            alt={movieDetail.title}
          />
        </Col>
        <Col lg={8} xs={12}>
          {movieDetail?.genres?.map((genre, index) => (
            <Badge bg="danger" key={index} className="me-1">
              {genre.name}
            </Badge>
          ))}
          <h1 className="mt-1">{movieDetail.title}</h1>
          <h4>{movieDetail.tagline}</h4>
          <Row>
            <Col>
              <span style={{ marginRight: "5px" }}>
                <FaImdb style={{ color: "yellow", marginRight: "3px" }} />
                {movieDetail.vote_average.toFixed(1)}
              </span>
              <span style={{ marginRight: "5px" }}>
                <GoPersonFill />
                {movieDetail.popularity.toLocaleString()}
              </span>
              <span>
                {movieDetail.adult ? (
                  <TbRating18Plus style={{ color: "yellow" }} />
                ) : (
                  <TbWashDryA style={{ color: "yellow" }} />
                )}
              </span>
            </Col>
          </Row>

          <p>{movieDetail.overview}</p>

          <Col className="badge-container">
            <Badge bg="danger" className="custom-badge">
              예산
            </Badge>
            ₩ {movieDetail.budget.toLocaleString()}
          </Col>
          <Col className="badge-container">
            <Badge bg="danger" className="custom-badge">
              수익
            </Badge>
            ₩ {movieDetail.revenue.toLocaleString()}
          </Col>
          <Col className="badge-container">
            <Badge bg="danger" className="custom-badge">
              개봉일
            </Badge>
            {movieDetail.release_date}
          </Col>
          <Col className="badge-container">
            <Badge bg="danger" className="custom-badge">
              런타임
            </Badge>
            {movieDetail.runtime}분
          </Col>
        </Col>
      </Row>
      <Row>
        <Col lg={4} xs={12}>
          <MovieVideos />
        </Col>
        <Col lg={8} xs={12}>
          <Col className="mb-5">
            <Button
              variant={activeComponent === "reviews" ? "danger" : "secondary"}
              className="me-3"
              onClick={() => setActiveComponent("reviews")}
            >
              리뷰 {reviews ? `(${reviews.results.length})` : ""}
            </Button>
            <Button
              variant={activeComponent === "recommend" ? "danger" : "secondary"}
              onClick={() => setActiveComponent("recommend")}
            >
              추천 영화 {recommend ? `(${recommend.results.length})` : ""}
            </Button>
          </Col>

          {/* activeComponent에 따라 컴포넌트 조건부 렌더링 */}
          {activeComponent === "reviews" && <MovieReviews />}
          {activeComponent === "recommend" && <MovieRecommend />}
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetailPage;
