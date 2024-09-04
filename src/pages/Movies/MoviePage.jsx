import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import "./MoviePage.style.css";

// 경로 2가지
// nav바에서 클릭 -> poplarMovie 보여주기
// keyword를 입력 -> keyword와 관련된 영화들 보여주기

// 페이지네이션 설치
// page state 만들기
// 페이지네이션 클릭 할 때마다 page 바꿔주기
// page 값이 바뀔 때마다 useSearchMovie에 page까지 넣어서 fetch

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

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
          필터
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {data?.results.length > 0 ? (
              data?.results.map((movie, index) => (
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
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={data?.total_pages} //전체 페이지 수
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
