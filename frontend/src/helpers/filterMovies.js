const filterMovies = (movies) => {
  let counter = 0;
  const filteredMovies = movies.filter((movie) => {
    if (movie.poster_path && movie.backdrop_path && counter < 12) {
      counter++;
      return movie;
    }
  });
  return filteredMovies;
};

export default filterMovies;
