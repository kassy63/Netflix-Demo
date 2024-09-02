import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { TbRating18Plus, TbWashDryA } from "react-icons/tb";
import { FaImdb } from "react-icons/fa";
import { GoPersonFill } from "react-icons/go";

const MovieCard = ({ movie, index }) => {
  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
          ")",
      }}
      className="movie-card"
    >
      <div className="overlay">
        <h1>{movie.title}</h1>
        {movie.genre_ids.map((id) => (
          <Badge style={{ marginRight: "3px" }}>{id}</Badge>
        ))}
        <div>
          <div>
            <FaImdb style={{ color: "yellow", marginRight: "3px" }} />
            {movie.vote_average}
          </div>
          <div>
            <GoPersonFill />
            {movie.popularity}
          </div>
          {/* <div>{movie.adult ? "over18" : "under18"}</div> */}
          <div>
            {movie.adult ? (
              <TbRating18Plus style={{ color: "yellow" }} />
            ) : (
              <TbWashDryA />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
