import { useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Alert, Button } from "react-bootstrap";
import { useMovieReviewsQuery } from "../../../../hooks/useMovieReviews";
import "./MovieReviews.style.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useMovieReviewsQuery(movieId);
  const [expandedReviewIds, setExpandedReviewIds] = useState([]);

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

  if (reviews.results.length === 0) {
    return <p>리뷰가 없습니다.</p>;
  }

  const toggleReviewExpansion = (id) => {
    setExpandedReviewIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((prevId) => prevId !== id)
        : [...prevIds, id]
    );
  };

  return (
    <div>
      {reviews.results.map((review) => {
        const isExpanded = expandedReviewIds.includes(review.id);
        const contentToShow = isExpanded
          ? review.content
          : `${review.content.slice(0, 300)}...`;
        const isLongReview = review.content.length > 300; // 300자 이상일 때만 더보기/접기

        return (
          <div key={review.id} className="mb-4">
            <h5>{review.author}</h5>
            <p>{contentToShow}</p>
            {isLongReview && (
              <Button
                variant="link"
                className="review-button"
                onClick={() => toggleReviewExpansion(review.id)}
              >
                {isExpanded ? "접기" : "더보기"}
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MovieReviews;
