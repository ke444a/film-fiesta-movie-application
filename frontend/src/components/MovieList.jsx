import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import MovieCard from "./MovieCard";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";

const MovieList = ({ theme }) => {
  const [isHover, setIsHover] = useState(false);

  const { data: movieList, ...result } = useQuery({
    queryKey: ["movie", theme],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_SERVER_URL}/${theme}`)
        .then((res) => res.data),
  });

  if (result.isLoading) {
    return <Loader isDarkTheme={true} />;
  }

  if (result.isError) {
    return <ErrorMessage message={result.error?.message} />;
  }

  return (
    <section id={theme} className="mt-12 sm:mt-16 lg:mt-20 2xl:mt-24">
      <div className="container">
        <h2 className="mb-2 text-base sm:text-lg md:mb-3 md:text-xl xl:text-2xl">
          <Link
            to="/search"
            className="inline-block cursor-pointer"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {theme === "trending" ? "Trending" : "Top Rated"}
            <FontAwesomeIcon
              className={`fa-sm transition-color ml-1 ${
                isHover ? "text-golden" : ""
              }`}
              icon={faChevronRight}
            />
          </Link>
        </h2>
      </div>
      <div className="mr-0 ml-auto max-w-[95%]">
        <div className="movie-list flex flex-nowrap gap-x-2 overflow-x-auto overflow-y-hidden overscroll-x-contain md:gap-x-3">
          {result.isSuccess &&
            movieList.map((movie) => {
              return (
                movie.vote_average !== 0 &&
                movie.poster_path !== null && (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    poster_path={movie.poster_path}
                    rating={movie.vote_average.toFixed(1)}
                  />
                )
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default MovieList;
