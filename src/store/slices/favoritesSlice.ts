import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product, FavoritesState } from '../../types';

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const exists = state.items.find((item) => item.id === product.id);
      if (!exists) {
        state.items.push(product);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;

