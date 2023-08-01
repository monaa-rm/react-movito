// movieSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "b1223b4f8f85cc05490eb9417c4450a4"; 

// Async thunk for fetching movie details
export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (movieId) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`
    );
    return response.data;
  }
);

// Async thunk for fetching movie actors
export const fetchMovieActors = createAsyncThunk(
  "movies/fetchMovieActors",
  async (movieId) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
    );
    return response.data;
  }
);

// Async thunk for fetching movie images
export const fetchMovieImages = createAsyncThunk(
  "movies/fetchMovieImages",
  async (movieId) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${API_KEY}`
    );
    const {backdrops , posters} = response.data;
    const imgs = {
      bg: backdrops[0].file_path,
      poster: posters[0].file_path,
    }
    return imgs;
  }
);
// Async thunk for fetching favorite movies
export const fetchFavoriteMovieId = createAsyncThunk(
  "movies/fetchFavoriteMovieId",
  async () => {
    try {
      const response = await axios.get(
        "https://netflix-33b1c-default-rtdb.firebaseio.com/favorit.json"
      );
      const favoriteIds = Object.keys(response.data || {});
      return favoriteIds || [];
    } catch (error) {
      console.log(error);
    }
  }
);
export const toggleFavorite = createAsyncThunk(
  "movies/toggleFavorite",
  async (movieId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const isFavorite = state.movies.favorite.includes(movieId)
      if (isFavorite) {
        const response = await axios.delete(
          `https://netflix-33b1c-default-rtdb.firebaseio.com/favorit/${movieId}.json`
        );
        return movieId;
      } else {
        const response = await axios.post(
          `https://netflix-33b1c-default-rtdb.firebaseio.com/favorit/${movieId}.json`,
          { id: movieId }
        );

        return movieId;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movieDetails: {
      name: "",
      year: "",
      overview: "",
      genres: [],
      tagline: "",
      language: "",
      crew: [],
      keys: [],
    },
    movieActors: [],
    movieImages: {
      bg: "",
      poster: "",
    },
    favorite: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Reducer for movie details
    builder.addCase(fetchMovieDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMovieDetails.fulfilled, (state, action) => {
      state.loading = false;
      const {
        name,
        title,
        original_name,
        first_air_data,
        release_date,
        genres,
        overview,
        tagline,
        original_language,
        languages,
        created_by,
        videos,
      } = action.payload;

      state.movieDetails = {
        name: name || title || original_name,
        year: first_air_data || release_date,
        overview: overview,
        genres,
        tagline,
        language: original_language || languages,
        crew: created_by,
        keys: videos.results.map((keys) => keys.key),
      };
    });
    builder.addCase(fetchMovieDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Reducer for movie actors
    builder.addCase(fetchMovieActors.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMovieActors.fulfilled, (state, action) => {
      state.loading = false;
      state.movieActors = action.payload.cast;
    });
    builder.addCase(fetchMovieActors.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Reducer for movie images
    builder.addCase(fetchMovieImages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMovieImages.fulfilled, (state, action) => {
      state.loading = false;
      state.movieImages = {backdrops : "", posters : ""};
      state.movieImages = action.payload;
    });
    builder.addCase(fetchMovieImages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    //Fetch favorite movies
    builder.addCase(fetchFavoriteMovieId.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchFavoriteMovieId.fulfilled, (state, action) => {
      state.favorite = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchFavoriteMovieId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    //Favorite movies
    builder.addCase(toggleFavorite.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(toggleFavorite.fulfilled, (state, action) => {
      const movieId = action.payload;
      const isLiked = state.favorite?.includes(movieId);
      if (isLiked) {
        state.favorite = state.favorite.filter((obj) => obj != movieId);
      } else {
        state.favorite.push(movieId);
      }
      state.loading = false;
    });
    builder.addCase(toggleFavorite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default movieSlice.reducer;
