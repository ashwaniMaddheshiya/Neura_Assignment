import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import filtersReducer from './slices/filtersSlice';
import favoritesReducer from './slices/favoritesSlice';
import type { RootState } from '../types';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
});

export type { RootState };
export type AppDispatch = typeof store.dispatch;

