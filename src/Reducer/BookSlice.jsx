import { createSlice } from "@reduxjs/toolkit";
export const BookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {
    setBook: (state, action) => {
      state.books = action.payload;
      state.loading = false;
      state.error = null;
      return state;
    },
    createBook: (state, action) => {
      state.books = action.payload;
      state.loading = false;
      state.error = null;
      return state;
    },
    editBook: (state, action) => {
      const id = action.payload;
      state.books = state.books.filter((book) => book.id !== id);
      state.error = null;
      state.loading = false;
    },
    deleteBook: (state, action) => {
      const id = action.payload;
      state.books = state.books.filter((book) => book.id !== id);
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});
export const {
  setBook,
  createBook,
  editBook,
  deleteBook,
  setLoading,
  setError,
} = BookSlice.actions;
