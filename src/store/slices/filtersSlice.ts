import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { FiltersState } from '../../types';

const initialState: FiltersState = {
  searchQuery: '',
  selectedCategory: 'all',
  sortBy: 'default',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'default' | 'price-low' | 'price-high'>) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.selectedCategory = 'all';
      state.sortBy = 'default';
    },
  },
});

export const { setSearchQuery, setSelectedCategory, setSortBy, resetFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;

