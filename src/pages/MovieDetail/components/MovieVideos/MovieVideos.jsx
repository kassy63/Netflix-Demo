import React from "react";
import { Spinner, Alert } from "react-bootstrap";
import YouTube from "react-youtube";
import { useParams } from "react-router-dom";
import { useMovieVideosQuery } from "../../../../hooks/useMovieVideos";

const MovieVideos = () => {
  const { movieId } = useParams();
  const {
    data: videos,
    isLoading,
    isError,
    error,
  } = useMovieVideosQuery(movieId);

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

  if (videos.results.length === 0) {
    return <p>예고편이 없습니다.</p>;
  }

  // 예고편 (Trailer) 비디오만 필터링
  const trailers = videos.results.filter((video) => video.type === "Trailer");

  return (
    <div>
      <h3>예고편({trailers.length})</h3>
      {trailers.map((trailer) => (
        <div key={trailer.id} className="mb-4">
          <YouTube
            videoId={trailer.key}
            opts={{ width: "100%", height: "390px" }}
          />
          <p>{trailer.name}</p>
        </div>
      ))}

      {/* <h3>비디오({videos.results.length})</h3>
      {videos.results.map((video) => (
        <div key={video.id} className="mb-4">
          <YouTube
            videoId={video.key}
            opts={{ width: "100%", height: "390px" }}
          />
          <p>
            {video.name} ({video.type})
          </p>
        </div>
      ))} */}
    </div>
  );
};

export default MovieVideos;
