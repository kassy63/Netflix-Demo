import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchUpcomingMovies = () => {
  // return api.get(`https://api.themoviedb.org/3/movie/upcoming`);
  return api.get(`/movie/upcoming?language=ko-KR`);
};

export const useUpcomingMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-upcoming"],
    queryFn: fetchUpcomingMovies,
    select: (result) => result.data,
  });
};
// 컴포넌트를 비즈니스 로직과 ui를 분리하는 게 좋음
