import { describe, it, expect } from 'vitest';
import filtersReducer, {
  setSearchQuery,
  setSelectedCategory,
  setSortBy,
  resetFilters,
} from '../filtersSlice';
import type { FiltersState } from '../../../types';

describe('filtersSlice', () => {
  const initialState: FiltersState = {
    searchQuery: '',
    selectedCategory: 'all',
    sortBy: 'default',
  };

  it('should return initial state', () => {
    expect(filtersReducer(undefined, { type: 'unknown' })).toEqual(
      initialState,
    );
  });

  it('should handle setSearchQuery', () => {
    const state = filtersReducer(initialState, setSearchQuery('laptop'));
    expect(state.searchQuery).toBe('laptop');
  });

  it('should handle setSelectedCategory', () => {
    const state = filtersReducer(initialState, setSelectedCategory('electronics'));
    expect(state.selectedCategory).toBe('electronics');
  });

  it('should handle setSortBy', () => {
    const state = filtersReducer(initialState, setSortBy('price-low'));
    expect(state.sortBy).toBe('price-low');
  });

  it('should handle resetFilters', () => {
    const modified: FiltersState = {
      searchQuery: 'test',
      selectedCategory: 'electronics',
      sortBy: 'price-high',
    };
    const state = filtersReducer(modified, resetFilters());
    expect(state).toEqual(initialState);
  });
});


