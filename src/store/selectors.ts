import { createSelector } from '@reduxjs/toolkit';
import type { RootState, Product } from '../types';

// Base selectors
export const selectAllProducts = (state: RootState): Product[] => state.products.items;
export const selectCategories = (state: RootState): string[] => state.products.categories;
export const selectCurrentProduct = (state: RootState): Product | null => state.products.currentProduct;
export const selectProductsLoading = (state: RootState): boolean => state.products.loading;
export const selectProductsError = (state: RootState): string | null => state.products.error;

export const selectSearchQuery = (state: RootState): string => state.filters.searchQuery;
export const selectSelectedCategory = (state: RootState): string => state.filters.selectedCategory;
export const selectSortBy = (state: RootState): 'default' | 'price-low' | 'price-high' => state.filters.sortBy;

export const selectFavorites = (state: RootState): Product[] => state.favorites.items;
export const selectIsFavorite = (state: RootState, productId: number): boolean =>
  state.favorites.items.some((item) => item.id === productId);

// Memoized selectors
export const selectFilteredProducts = createSelector(
  [selectAllProducts, selectSearchQuery, selectSelectedCategory, selectSortBy],
  (products, searchQuery, selectedCategory, sortBy): Product[] => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Sort products
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }
);

export const selectFavoriteIds = createSelector([selectFavorites], (favorites): number[] =>
  favorites.map((item) => item.id)
);

