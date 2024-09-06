import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

// fetchSearchMovie 수정: genre 파라미터 추가
const fetchSearchMovie = ({ keyword, page, genre }) => {
  let url = keyword
    ? `/search/movie?query=${keyword}&page=${page}&language=ko-KR`
    : `/movie/popular?page=${page}&language=ko-KR`;

  if (genre) {
    url += `&with_genres=${genre}`; // 장르가 있을 경우 쿼리 파라미터 추가
  }

  return api.get(url);
};

// useSearchMovieQuery 수정: genre 파라미터 추가
export const useSearchMovieQuery = ({ keyword, page, genre }) => {
  return useQuery({
    queryKey: ["movie-search", { keyword, page, genre }],
    queryFn: () => fetchSearchMovie({ keyword, page, genre }),
    select: (result) => result.data,
  });
};
