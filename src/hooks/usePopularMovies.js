import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchPopularMovies = () => {
  // return api.get(`https://api.themoviedb.org/3/movie/popular`);
  return api.get(`/movie/popular`);
};

export const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-popular"],
    queryFn: fetchPopularMovies,
    select: (result) => result.data,
  });
};
// 컴포넌트를 비즈니스 로직과 ui를 분리하는 게 좋음
