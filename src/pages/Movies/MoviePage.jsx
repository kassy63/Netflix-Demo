import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import {
  Alert,
  Button,
  Col,
  Container,
  Dropdown,
  Row,
  Spinner,
} from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import "./MoviePage.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

// 경로 2가지
// nav바에서 클릭 -> poplarMovie 보여주기
// keyword를 입력 -> keyword와 관련된 영화들 보여주기

// 페이지네이션 설치
// page state 만들기
// 페이지네이션 클릭 할 때마다 page 바꿔주기
// page 값이 바뀔 때마다 useSearchMovie에 page까지 넣어서 fetch

const MoviePage = () => {
  const [query] = useSearchParams();
  const keyword = query.get("q");
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedGenre, setSelectedGenre] = useState(null); // 선택한 장르 상태 추가

  // 장르 데이터 가져오기
  const { data: genres } = useMovieGenreQuery();

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
    genre: selectedGenre, // 선택된 장르를 서버로 전달
  });

  // 장르가 변경되면 페이지를 1로 설정
  useEffect(() => {
    setPage(1);
  }, [selectedGenre]);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  // 인기 순 정렬 (높은 순 또는 낮은 순)
  const sortedMovies = data?.results?.slice().sort((a, b) => {
    if (sortOrder === "desc") {
      return b.popularity - a.popularity; // 높은 순
    } else {
      return a.popularity - b.popularity; // 낮은 순
    }
  });

  // 선택한 장르에 따라 영화 필터링
  const filteredMovies = selectedGenre
    ? sortedMovies?.filter((movie) => movie.genre_ids.includes(selectedGenre))
    : sortedMovies;

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
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          {/* 필터 영역 */}
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              인기순 정렬
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSortOrder("desc")}>
                인기 높은 순
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSortOrder("asc")}>
                인기 낮은 순
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* 장르 필터링 버튼 */}
          <div>
            <Button
              variant={!selectedGenre ? "danger" : "secondary"}
              onClick={() => setSelectedGenre(null)}
              className="me-2 mb-2"
            >
              모든 장르
            </Button>
            {genres?.map((genre) => (
              <Button
                key={genre.id}
                variant={selectedGenre === genre.id ? "danger" : "secondary"}
                onClick={() => setSelectedGenre(genre.id)}
                className="me-2 mb-2"
              >
                {genre.name}
              </Button>
            ))}
          </div>
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {filteredMovies?.length > 0 ? (
              filteredMovies.map((movie, index) => (
                <Col key={index} lg={4} xs={12}>
                  <MovieCard movie={movie} />
                </Col>
              ))
            ) : (
              <Col>
                <Alert variant="warning">검색 결과가 없습니다</Alert>
              </Col>
            )}
          </Row>
          <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item previous"
            previousLinkClassName="page-link previous"
            nextClassName="page-item next"
            nextLinkClassName="page-link next"
            breakLabel="..."
            breakClassName="page-item break"
            breakLinkClassName="page-link break"
            pageCount={data?.total_pages} // 전체 페이지 수
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            activeClassName="active"
            forcePage={page - 1}
            // renderOnZeroPageCount={null}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
