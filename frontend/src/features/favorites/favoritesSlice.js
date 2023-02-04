import { createSlice } from "@reduxjs/toolkit";

const saveToLocalStorage = (newMovies) => {
  localStorage.setItem("favorites", JSON.stringify(newMovies));
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    movies: JSON.parse(localStorage.getItem("favorites")) || [],
  },
  reducers: {
    addFavorite: {
      reducer(state, action) {
        state.movies.push(action.payload);
        saveToLocalStorage(state.movies);
      },
      prepare({ id, title, poster_path, rating }) {
        return {
          payload: {
            id: id,
            title: title,
            poster_path: poster_path,
            rating: rating,
          },
        };
      },
    },

    removeFavorite: (state, action) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload.id
      );
      saveToLocalStorage(state.movies);
    },
  },
});

export const selectAllFavorites = (state) => state.favorites.movies;
export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
