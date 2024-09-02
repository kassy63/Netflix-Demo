import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTopRatedMovies = () => {
  // return api.get(`https://api.themoviedb.org/3/movie/top_rated`);
  return api.get(`/movie/top_rated?language=ko-KR`);
};

export const useTopRatedMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-top-rated"],
    queryFn: fetchTopRatedMovies,
    select: (result) => result.data,
  });
};
// 컴포넌트를 비즈니스 로직과 ui를 분리하는 게 좋음
