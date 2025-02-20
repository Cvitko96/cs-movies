import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTrendingMovies } from "../common/service/moviesService";
import { Link } from "react-router";
import { formatDate } from "../common/utils/helperFunction";
import MovieCard from "../components/MovieCard";

const List = () => {
  const [selectedGrade, setSelectedGrade] = useState();

  const { data: trendingMovies, isLoading } = useQuery({
    queryFn: () => fetchTrendingMovies(),
    queryKey: ["trendingMovies"],
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="custom-block">
        <Link className="h4 button-primary text-decoration-none" to="/create">
          Add New Movie
        </Link>

        <input
          value={selectedGrade}
          onChange={(event) => setSelectedGrade(event.target.value)}
          placeholder="Minimum movie grade to highlight"
          className="h5 input__field color-base-100 min-width-250"
          type="text"
        />
      </div>

      <div className="movies">
        {trendingMovies?.map((movie) => {
          return (
            <MovieCard
              movie={movie}
              selectedGrade={selectedGrade}
              key={movie.id}
            />
          );
        })}
      </div>
    </>
  );
};

export default List;
