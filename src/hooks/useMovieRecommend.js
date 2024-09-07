import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieRecommend = (movieId) => {
  if (!movieId) {
    throw new Error("Invalid movie ID");
  }
  return api.get(`/movie/${movieId}/recommendations?language=ko-KR`);
};

export const useMovieRecommendQuery = (movieId) => {
  return useQuery({
    queryKey: ["movie-recommendations", movieId],
    queryFn: () => fetchMovieRecommend(movieId).then((result) => result.data),
    staleTime: 300000, // 5분
    enabled: !!movieId, // movieId가 없으면 쿼리 실행 안 함
  });
};
