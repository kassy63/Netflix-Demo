import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieVideos = (movieId) => {
  // movieId가 undefined가 아닌지 확인하고 API 요청
  if (!movieId) {
    throw new Error("Invalid movie ID");
  }

  return api.get(`/movie/${movieId}/videos?language=ko-KR`);
};

export const useMovieVideosQuery = (movieId) => {
  return useQuery({
    queryKey: ["movie-video", movieId],
    queryFn: () => fetchMovieVideos(movieId),
    select: (result) => result.data,
    staleTime: 300000, // 5분
    enabled: !!movieId, // movieId가 없으면 쿼리 실행 안 함
  });
};
