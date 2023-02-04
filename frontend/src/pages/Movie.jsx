import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { selectAllFavorites } from "../features/favorites/favoritesSlice";
import {
  addFavorite,
  removeFavorite,
} from "../features/favorites/favoritesSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import convertToHours from "../helpers/convertToHours";
import filterMovies from "../helpers/filterMovies";

const Movie = () => {
  const { movieId } = useParams();
  const favorites = useSelector(selectAllFavorites);
  const dispatch = useDispatch();
  const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;

  const { data: movieData, ...result } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_SERVER_URL}/movie/${movieId}`)
        .then((res) => res.data),
  });

  const handleFavoriteChange = () => {
    const movieProps = {
      id: movieData.id,
      title: movieData.title,
      poster_path: movieData.poster_path,
      rating: movieData.vote_average,
    };
    const isFavorite = favorites.some((movie) => movie.id === movieData.id);
    isFavorite
      ? dispatch(removeFavorite(movieProps))
      : dispatch(addFavorite(movieProps));
  };

  if (result.isLoading) {
    return (
      <main>
        <Loader isDarkTheme={true} />
      </main>
    );
  }

  if (result.isError) {
    return (
      <main>
        <ErrorMessage message={result.error?.message} />
      </main>
    );
  }

  return (
    <main className="pb-6 md:pb-10 xl:pb-20">
      <div
        style={{
          backgroundImage: `url(${imageBaseUrl + movieData.backdrop_path})`,
        }}
        className="relative mb-4 h-fit w-full bg-cover bg-center bg-no-repeat before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:bg-[rgba(0,0,0,0.6)] md:mb-6 xl:mb-8"
      >
        <div className="bg-[linear-gradient(to_left,rgba(0,0,0,0),rgba(0,0,0,1)_100%)]">
          <div className="container">
            <div className="relative min-[300px]:py-5 sm:py-7 md:py-10 lg:py-14 2xl:py-20">
              <h2 className="text-lg sm:text-xl md:mb-1 md:text-2xl lg:leading-7 xl:text-3xl xl:leading-8 2xl:text-4xl">
                {movieData.title}
              </h2>
              <p className="mb-1 text-sm font-medium opacity-50 sm:mb-3 sm:text-base xl:mb-5 2xl:text-lg">
                <span>{movieData.release_date.split("-")[0]}</span>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <span>{convertToHours(movieData.runtime)}</span>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <span>
                  {movieData.production_countries
                    .map((movie) => movie.iso_3166_1)
                    .join(", ")}
                </span>
              </p>
              <p className="mb-1 max-h-[550px] text-sm font-medium min-[300px]:mb-2 min-[500px]:w-[80%] min-[500px]:text-base min-[500px]:font-normal md:w-[65%] xl:mb-4 2xl:text-lg">
                {movieData.overview}
              </p>
              <div className="text-xs min-[300px]:text-sm sm:text-base 2xl:text-lg">
                <p>
                  <span className="font-medium opacity-50">Starring:</span>{" "}
                  {movieData.credits.cast
                    .slice(0, 3)
                    .map((actor) => actor.name)
                    .join(", ")}
                </p>
                <p>
                  <span className="font-medium opacity-50">Directed by:</span>{" "}
                  {movieData.credits.crew
                    .filter((crew) => crew.job === "Director")
                    .map((director) => director.name)
                    .join(", ")}
                </p>
                <p>
                  <span className="font-medium opacity-50">Genres:</span>{" "}
                  {movieData.genres.map((genre) => genre.name).join(", ")}
                </p>
              </div>
              <div className="mt-4 lg:mt-5">
                <a
                  href={movieData.homepage}
                  target="_blank"
                  className="transition-color mr-4 inline-block cursor-pointer rounded-md border-2 border-[rgba(255,255,255,0.3)] p-2 text-center duration-300  hover:bg-white-1 hover:text-red-highlight active:animate-click sm:p-3 2xl:p-4"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon
                    className="text-sm min-[400px]:text-xl sm:text-2xl 2xl:text-3xl"
                    icon={faPlay}
                    fixedWidth
                  />
                </a>
                <a
                  onClick={handleFavoriteChange}
                  className="transition-color inline-block cursor-pointer rounded-md border-2 border-[rgba(255,255,255,0.3)] p-2 text-center duration-300 hover:bg-white-1 hover:text-red-highlight active:animate-click sm:p-3 2xl:p-4"
                >
                  {favorites.some((movie) => movie.id === movieData.id) ? (
                    <FontAwesomeIcon
                      className="text-sm text-red-highlight min-[400px]:text-xl sm:text-2xl 2xl:text-3xl"
                      icon={faHeart}
                      fixedWidth
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="text-sm min-[400px]:text-xl sm:text-2xl 2xl:text-3xl"
                      icon={faHeartRegular}
                      fixedWidth
                    />
                  )}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {movieData.recommendations.results.length > 0 && (
        <div className="container">
          <h3 className="mb-4 font-heading text-lg sm:text-xl md:text-2xl 2xl:text-3xl">
            More Like This
          </h3>
          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-4 xl:gap-4">
            {filterMovies(movieData.recommendations.results).map(
              (movie, index) => {
                return (
                  <Link
                    to={`../movie/${movie.id}`}
                    key={index}
                    className="transform cursor-pointer duration-200 hover:scale-110"
                    preventScrollReset={true}
                  >
                    <LazyLoadImage
                      className="md:h-full"
                      src={imageBaseUrl.concat(movie.poster_path)}
                      placeholder={
                        <div className="h-[150px] bg-black-1 blur-lg min-[400px]:h-[170px] sm:h-[210px] md:h-[230px] lg:h-[245px] 2xl:h-[280px]" />
                      }
                      width={"100%"}
                    />
                  </Link>
                );
              }
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Movie;
