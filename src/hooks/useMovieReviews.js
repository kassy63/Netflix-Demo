import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieReviews = (movieId) => {
  if (!movieId) {
    throw new Error("Invalid movie ID");
  }
  return api.get(`/movie/${movieId}/reviews?language=en-US`);
};

export const useMovieReviewsQuery = (movieId) => {
  return useQuery({
    queryKey: ["movie-reviews", movieId],
    queryFn: () => fetchMovieReviews(movieId).then((result) => result.data),
    staleTime: 300000, // 5분
    enabled: !!movieId, // movieId가 없으면 쿼리 실행 안 함
  });
};
