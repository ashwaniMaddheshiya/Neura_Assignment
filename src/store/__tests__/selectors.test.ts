import { describe, it, expect } from 'vitest';
import {
  selectFilteredProducts,
  selectIsFavorite,
} from '../selectors';
import type { RootState } from '../../types';

describe('selectors', () => {
  const baseState: RootState = {
    products: {
      items: [
        { id: 1, title: 'Laptop', category: 'electronics', price: 999, description: '', image: '', rating: { rate: 4.5, count: 100 } },
        { id: 2, title: 'T-Shirt', category: 'clothing', price: 19, description: '', image: '', rating: { rate: 4, count: 50 } },
        { id: 3, title: 'Phone', category: 'electronics', price: 599, description: '', image: '', rating: { rate: 4.8, count: 200 } },
      ],
      categories: [],
      currentProduct: null,
      loading: false,
      error: null,
    },
    filters: {
      searchQuery: '',
      selectedCategory: 'all',
      sortBy: 'default',
    },
    favorites: {
      items: [{ id: 1, title: 'Laptop', category: 'electronics', price: 999, description: '', image: '', rating: { rate: 4.5, count: 100 } }],
    },
  };

  describe('selectFilteredProducts', () => {
    it('returns all products when no filters applied', () => {
      const result = selectFilteredProducts(baseState);
      expect(result).toHaveLength(3);
    });

    it('filters by search query', () => {
      const state: RootState = {
        ...baseState,
        filters: { ...baseState.filters, searchQuery: 'laptop' },
      };
      const result = selectFilteredProducts(state);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Laptop');
    });

    it('filters by category', () => {
      const state: RootState = {
        ...baseState,
        filters: { ...baseState.filters, selectedCategory: 'electronics' },
      };
      const result = selectFilteredProducts(state);
      expect(result).toHaveLength(2);
      expect(result.every((p) => p.category === 'electronics')).toBe(true);
    });

    it('sorts by price low to high', () => {
      const state: RootState = {
        ...baseState,
        filters: { ...baseState.filters, sortBy: 'price-low' },
      };
      const result = selectFilteredProducts(state);
      expect(result[0].price).toBe(19);
      expect(result[result.length - 1].price).toBe(999);
    });

    it('sorts by price high to low', () => {
      const state: RootState = {
        ...baseState,
        filters: { ...baseState.filters, sortBy: 'price-high' },
      };
      const result = selectFilteredProducts(state);
      expect(result[0].price).toBe(999);
      expect(result[result.length - 1].price).toBe(19);
    });
  });

  describe('selectIsFavorite', () => {
    it('returns true if product is in favorites', () => {
      const result = selectIsFavorite(baseState, 1);
      expect(result).toBe(true);
    });

    it('returns false if product is not in favorites', () => {
      const result = selectIsFavorite(baseState, 2);
      expect(result).toBe(false);
    });
  });
});


