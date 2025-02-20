import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails } from "../common/service/moviesService";
import { formatDate } from "../common/utils/helperFunction";

const MovieDetails = () => {
  // Ukoliko želimo prikaz na vrhu stranice svaki put kada
  // dolazimo na ovaj page, potreban nam je ovaj useEffect ispod
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  //----------------------------------------------------------------

  const { id } = useParams();

  const navigate = useNavigate();

  const { data: movieDetails, isLoading } = useQuery({
    queryFn: () => fetchMovieDetails(id),
    queryKey: ["movieDetails", id],
    enabled: !!id,
  });

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="movie-details relative">
      <div className="wrapper">
        <img
          src={
            movieDetails.poster_path
              ? `https://image.tmdb.org/t/p/original${movieDetails.poster_path}`
              : "https://vinkoc-nextjs-demo-users-image.s3.eu-north-1.amazonaws.com/Novi+Projekt.jpg"
          }
          alt=""
        />
        <div>
          <h3 className="h3 h3--medium margin-right-1">{movieDetails.title}</h3>

          <p>
            {movieDetails.release_date && formatDate(movieDetails.release_date)}
          </p>
        </div>
      </div>

      <div className="details margin-1">
        <p className="h4 h4--medium">Overview:</p>
        <p className="margin-1"> {movieDetails.overview}</p>
        <p className="h4 h4--medium">Budget:</p>{" "}
        <p className="margin-1">
          {movieDetails.budget.toLocaleString("en-US") + " $"}
        </p>
        <p className="h4 h4--medium">Genres:</p>
        <div className="margin-1">
          {" "}
          {movieDetails.genres.map((genre) => (
            <p key={genre.id}>{genre.name} </p>
          ))}
        </div>
        <p className="h4 h4--medium">Production companies:</p>
        <div className="margin-1">
          {" "}
          {movieDetails.production_companies.map((company) => (
            <p key={company.id}>{company.name} </p>
          ))}
        </div>
      </div>
      <button
        className="button-primary back-button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};

export default MovieDetails;
