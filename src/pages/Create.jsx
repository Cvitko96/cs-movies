import React from "react";
import { genres } from "../common/constants/genres";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMovie } from "../common/service/moviesService";
import { useNavigate } from "react-router";

const Create = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutateAsync: addMovieMutation } = useMutation({
    mutationFn: addMovie,
    onSuccess: () => {
      queryClient.invalidateQueries(["trendingMovies"]);
    },
  });

  const onSubmit = async (data) => {
    const selectedGenres = data.genres
      ? data.genres.map((genreId) =>
          genres.find((genre) => genre.id === Number(genreId))
        )
      : [];

    const movieData = {
      title: data.title,
      budget: data.budget,
      overview: data.overview,
      genres: selectedGenres,
    };

    try {
      await addMovieMutation(movieData);
    } catch (e) {
      console.error(e);
    }

    navigate(-1);
  };

  return (
    <form
      className="color-primary add-movie-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-center">New Movie</h3>

      <div className="input-selection margin-bottom-1">
        {genres.map((genre) => {
          return (
            <div key={genre.id}>
              <label>
                <input
                  type="checkbox"
                  value={genre.id}
                  {...register("genres", {
                    validate: (value, formValues) =>
                      (formValues.genres && formValues.genres.length > 0) ||
                      "Please select at least one genre",
                  })}
                />
                <span className="margin-left-1">{genre.name}</span>
              </label>
            </div>
          );
        })}
        {errors?.genres && (
          <p className="color-error">{errors.genres.message}</p>
        )}
      </div>

      <section className="flex-column flex-gap-2">
        <div className="double-input-block ">
          <div className="input-basic">
            <label className="h6 color-base-100 margin-left-1">Title</label>
            <input
              {...register("title", { required: true })}
              placeholder="Title"
              className="h5 input__field color-base-100"
              type="text"
            />
            {errors?.title?.type === "required" && (
              <p className="color-error">This field is required</p>
            )}
          </div>

          <div className="input-basic">
            <label className="h6 color-base-100 margin-left-1">
              Budget (Only numbers in dollars)
            </label>
            <input
              {...register("budget", { pattern: /^\d+$/ })}
              placeholder="Budget"
              className="h5 input__field color-base-100"
              type="text"
            />
            {errors?.budget?.type === "pattern" && (
              <p className="color-error">This field accept only numbers</p>
            )}
          </div>
        </div>

        <div className="input-basic">
          <label className="h6 color-base-100 margin-left-1">Overview</label>
          <input
            {...register("overview", {
              required: true,
              minLength: 20,
            })}
            placeholder="Overview"
            className="h5 input__field color-base-100"
            type="text"
          />
          {errors?.overview?.type === "required" && (
            <p className="color-error">This field is required</p>
          )}
          {errors?.overview?.type === "minLength" && (
            <p className="color-error">
              This field must have at least 20 characters
            </p>
          )}
        </div>

        <button className={` h4 button-primary margin-top-1`} type="submit">
          Submit
        </button>
      </section>
    </form>
  );
};

export default Create;
