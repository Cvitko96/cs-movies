import React from "react";
import { Link } from "react-router";
import { formatDate } from "../common/utils/helperFunction";

const MovieCard = ({ movie, selectedGrade }) => {
  return (
    <div
      className={`
        ${
          selectedGrade &&
          movie.vote_average >= selectedGrade &&
          "background-highlight"
        } movie-card`}
    >
      <Link to={movie.original_title ? `/details/${movie.id}` : "/"}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
              : "https://vinkoc-nextjs-demo-users-image.s3.eu-north-1.amazonaws.com/Novi+Projekt.jpg"
          }
          alt=""
        />
      </Link>
      <div className="movie-card__content">
        <Link
          className="content-text h4 h4--medium color-base-100"
          to={movie.original_title ? `/details/${movie.id}` : "/"}
        >
          {movie.title}
        </Link>
        <p>{movie.release_date && formatDate(movie.release_date)}</p>
      </div>
    </div>
  );
};

export default MovieCard;
