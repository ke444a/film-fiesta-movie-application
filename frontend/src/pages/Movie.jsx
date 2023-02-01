import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { selectAllFavorites } from "../features/favorites/favoritesSlice";
import { addFavorite, removeFavorite } from "../features/favorites/favoritesSlice";
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

    const { data : movieData, ...result } = useQuery({
        queryKey: ["movie", movieId], 
        queryFn: () => axios.get(`${import.meta.env.VITE_SERVER_URL}/movie/${movieId}`).then(res => res.data),
    });

    const handleFavoriteChange = () => {
        const movieProps = {
            id: movieData.id,
            title: movieData.title,
            poster_path: movieData.poster_path,
            rating: movieData.vote_average
        };
        const isFavorite = favorites.some(movie => movie.id === movieData.id);
        isFavorite ? dispatch(removeFavorite(movieProps)) : dispatch(addFavorite(movieProps));
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
            <div style={{ backgroundImage: `url(${imageBaseUrl + movieData.backdrop_path})` }} className="relative bg-cover bg-center bg-no-repeat h-fit w-full mb-4 md:mb-6 xl:mb-8 before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:bg-[rgba(0,0,0,0.6)]">
                <div className="bg-[linear-gradient(to_left,rgba(0,0,0,0),rgba(0,0,0,1)_100%)]">
                    <div className="container">
                        <div className="min-[300px]:py-5 sm:py-7 md:py-10 lg:py-14 2xl:py-20 relative">
                            <h2 className="text-lg sm:text-xl md:text-2xl xl:text-3xl 2xl:text-4xl md:mb-1 lg:leading-7 xl:leading-8">{movieData.title}</h2>
                            <p className="opacity-50 font-medium text-sm sm:text-base 2xl:text-lg mb-1 sm:mb-3 xl:mb-5">
                                <span>{movieData.release_date.split("-")[0]}</span>&nbsp;&nbsp;|&nbsp;&nbsp;
                                <span>{convertToHours(movieData.runtime)}</span>&nbsp;&nbsp;|&nbsp;&nbsp;
                                <span>{movieData.production_countries.map(movie => movie.iso_3166_1).join(", ")}</span>
                            </p> 
                            <p className="font-medium text-sm min-[500px]:font-normal min-[500px]:text-base 2xl:text-lg min-[500px]:w-[80%] md:w-[65%] mb-1 min-[300px]:mb-2 xl:mb-4 max-h-[550px]">
                                {movieData.overview}
                            </p>
                            <div className="text-xs min-[300px]:text-sm sm:text-base 2xl:text-lg">
                                <p>
                                    <span className="opacity-50 font-medium">Starring:</span> {movieData.credits.cast.slice(0, 3).map(actor => actor.name).join(", ")}
                                </p>
                                <p>
                                    <span className="opacity-50 font-medium">Directed by:</span> {movieData.credits.crew.filter(crew => crew.job === "Director").map(director => director.name).join(", ")}
                                </p>
                                <p>
                                    <span className="opacity-50 font-medium">Genres:</span> {movieData.genres.map(genre => genre.name).join(", ")}
                                </p>
                            </div>
                            <div className="mt-4 lg:mt-5">
                                <a href={movieData.homepage} target="_blank" className="inline-block text-center cursor-pointer mr-4 p-2 sm:p-3 2xl:p-4 rounded-md border-2 border-[rgba(255,255,255,0.3)]  transition-color hover:bg-white-1 hover:text-red-highlight duration-300 active:animate-click" rel="noreferrer">
                                    <FontAwesomeIcon className="text-sm min-[400px]:text-xl sm:text-2xl 2xl:text-3xl" icon={faPlay} fixedWidth />
                                </a>
                                <a onClick={handleFavoriteChange} className="inline-block text-center cursor-pointer p-2 sm:p-3 2xl:p-4 rounded-md border-2 border-[rgba(255,255,255,0.3)] transition-color hover:bg-white-1 hover:text-red-highlight duration-300 active:animate-click">
                                    {favorites.some(movie => movie.id === movieData.id) ? <FontAwesomeIcon className="text-red-highlight text-sm min-[400px]:text-xl sm:text-2xl 2xl:text-3xl" icon={faHeart} fixedWidth /> : <FontAwesomeIcon className="text-sm min-[400px]:text-xl sm:text-2xl 2xl:text-3xl" icon={faHeartRegular} fixedWidth />}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            { movieData.recommendations.results.length > 0 &&
                    <div className="container">
                        <h3 className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl font-heading mb-4">More Like This</h3>
                        <div className="grid grid-cols-3 gap-2 md:grid-cols-4 sm:gap-3 xl:gap-4">
                            {
                                filterMovies(movieData.recommendations.results).map((movie, index) => 
                                {
                                    return (<Link to={`../movie/${movie.id}`} key={index} className="cursor-pointer transform duration-200 hover:scale-110" preventScrollReset={true}>
                                        <LazyLoadImage 
                                            className="md:h-full" 
                                            src={imageBaseUrl.concat(movie.poster_path)} 
                                            placeholder={<div className="h-[150px] min-[400px]:h-[170px] sm:h-[210px] md:h-[230px] lg:h-[245px] 2xl:h-[280px] bg-black-1 blur-lg" />}   
                                            width={"100%"}
                                        />
                                    </Link>);
                                }
                                )
                            }
                        </div>
                    </div>
            }
        </main>
    );
};

export default Movie;