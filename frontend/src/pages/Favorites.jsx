import { useSelector } from "react-redux";
import { selectAllFavorites } from "../features/favorites/favoritesSlice";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
    const favorites = useSelector(selectAllFavorites);

    return (
        <main className="pb-6 md:pb-10 xl:pb-20 bg-white-1">
            <section className="container">
                <h1 className="text-dark text-xl md:text-2xl 2xl:text-3xl font-bold my-5 font-body">My Favorites</h1>
                <div className="flex flex-row flex-wrap gap-y-5 gap-x-3 lg:gap-x-4">
                    {
                        favorites.length === 0 ? 
                            (
                                <p className="text-dark font-bold text-base md:text-lg 2xl:text-xl opacity-80">
                                    No movies in your favorites yet? Browse and find some to add!
                                </p>
                            ) : (
                                favorites.map(movie => {
                                    return (
                                        <MovieCard
                                            key={movie.id}
                                            id={movie.id}
                                            title={movie.title}
                                            poster_path={movie.poster_path}
                                            rating={parseFloat(movie.rating).toFixed(1)}
                                        />
                                    );
                                })
                            )
                    }
                </div>
            </section>
        </main>
    );
};

export default Favorites;