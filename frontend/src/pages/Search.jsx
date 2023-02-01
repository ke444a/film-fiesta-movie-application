import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faFilter } from "@fortawesome/free-solid-svg-icons";
import Select, { components } from "react-select";
import MovieCard from "../components/MovieCard";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";

const Search = () => {
    const [movieTitle, setMovieTitle] = useState("");
    const [sortOption, setSortOption] = useState("");

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        result.refetch();
    };

    const searchMovie = async () => {
        const url = `${import.meta.env.VITE_SERVER_URL}/search?query=${movieTitle.replace(" ", "+")}`;
        const response = await axios.get(url);
        return response.data;
    };
    
    const {data: searchResults, ...result} = useQuery({
        queryKey: ["search", movieTitle], 
        queryFn: searchMovie, 
        enabled: false,
    });

    const allSortOptions = [
        { value: "default", label: "" },
        { value: "rating_asc", label: "Rating Ascending" },
        { value: "rating_desc", label: "Rating Descending" },
        { value: "release_date_asc", label: "Release Date Ascending" },
        { value: "release_date_desc", label: "Release Date Descending" },
        { value: "popularity_asc", label: "Popularity Ascending" },
        { value: "popularity_desc", label: "Popularity Descending" },
    ];

    const selectStyles = {
        placeholder: (styles) => ({
            ...styles,
            color: "#333333",
            opacity: "0.5",
            fontWeight: "400",
        }),
        control: (styles) => ({
            ...styles,
            backgroundColor: "#F5F5FA",
            fontWeight: "500",
        }),
    };

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <FontAwesomeIcon icon={faFilter} className="" />
            </components.DropdownIndicator>
        );
    };

    const sortMovies = (movies) => {
        switch (sortOption.value) {
        case "rating_asc":
            return movies.sort((a, b) => a.vote_average - b.vote_average);
        case "rating_desc":
            return movies.sort((a, b) => b.vote_average - a.vote_average);
        case "release_date_asc":
            return movies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
        case "release_date_desc":
            return movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        case "popularity_asc":
            return movies.sort((a, b) => a.popularity - b.popularity);
        case "popularity_desc":
            return movies.sort((a, b) => b.popularity - a.popularity);
        default:
            return movies;
        }
    };

    const handleSelectedOption = (e) => {
        setSortOption(e);
    };

    return (
        <main className="bg-white-1 pb-6 md:pb-10 xl:pb-20">
            <section className="container">
                <h1 className="text-dark text-xl md:text-2xl 2xl:text-3xl font-bold my-5">Discover Your Next Favorite</h1>
                <form 
                    className="my-5 py-3 px-5 bg-black rounded-lg flex items-center shadow-inner" 
                    onSubmit={handleFormSubmit}
                >
                    <div className="flex flex-col justify-start w-full text-black">
                        <div className="bg-white-1 rounded-md p-3 w-full">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="opacity-40 mr-2 md:mr-3" />
                            <input 
                                className="bg-transparent border-none focus:outline-none text-base placeholder:opacity-50 placeholder:text-black-1 w-[90%]"
                                type="text"
                                name="title"
                                placeholder="Enter the movie title..."
                                value={movieTitle}
                                onChange={(e) => setMovieTitle(e.target.value)}
                            />
                        </div>
                        <Select
                            name="filters"
                            defaultValue={allSortOptions[0]}
                            options={allSortOptions}
                            styles={selectStyles}
                            className="mt-3 w-full sm:w-1/2 placeholder:opacity-50 placeholder:text-black-1"
                            placeholder="Filter by..."
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                    ...theme.colors,
                                    primary25: "#F5F5FA",
                                    primary: "#141010",
                                },
                            })}
                            components={{ DropdownIndicator }}
                            onChange={handleSelectedOption}
                            value={sortOption}
                        />
                    </div>
                    <button
                        className="ml-5 px-5 py-3 bg-dark-blue text-white rounded-lg shadow-inner font-medium transition hover:brightness-110 active:animate-click active:opacity-70"
                    >
                            Search
                    </button>
                </form>
                {
                    result.isError ? <ErrorMessage message={result.error?.message} /> :
                        (
                            result.isLoading ? (
                                <Loader isDarkTheme={false} />
                            ) : (  
                                <div className="flex flex-row flex-wrap gap-y-5 gap-x-3 lg:gap-x-4">
                                    {
                                        result.isSuccess && sortMovies(searchResults).map(movie => {
                                            return (
                                                movie.vote_average !== 0 &&
                                                movie.poster_path !== null &&
                                                <MovieCard
                                                    key={movie.id}
                                                    id={movie.id}
                                                    title={movie.title}
                                                    poster_path={movie.poster_path}
                                                    rating={movie.vote_average}
                                                />
                                            );
                                        })
                                    }
                                </div>
                            )
                        )
                }
            </section>
        </main>
    );
};

export default Search;
