import { describe, it, expect } from 'vitest';
import favoritesReducer, {
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
} from '../favoritesSlice';
import type { FavoritesState, Product } from '../../../types';

describe('favoritesSlice', () => {
  const initialState: FavoritesState = {
    items: [],
  };

  const product1: Product = {
    id: 1,
    title: 'Product 1',
    price: 10,
    description: '',
    category: 'cat',
    image: '',
    rating: { rate: 4, count: 10 },
  };

  const product2: Product = {
    id: 2,
    title: 'Product 2',
    price: 20,
    description: '',
    category: 'cat',
    image: '',
    rating: { rate: 5, count: 8 },
  };

  it('should return initial state', () => {
    expect(favoritesReducer(undefined, { type: 'unknown' })).toEqual(
      initialState,
    );
  });

  it('should handle addToFavorites', () => {
    const state = favoritesReducer(initialState, addToFavorites(product1));
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(product1);
  });

  it('should not add duplicate products', () => {
    const withItem: FavoritesState = { items: [product1] };
    const state = favoritesReducer(withItem, addToFavorites(product1));
    expect(state.items).toHaveLength(1);
  });

  it('should handle removeFromFavorites', () => {
    const withItems: FavoritesState = { items: [product1, product2] };
    const state = favoritesReducer(withItems, removeFromFavorites(1));
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(product2);
  });

  it('should handle clearFavorites', () => {
    const withItems: FavoritesState = { items: [product1, product2] };
    const state = favoritesReducer(withItems, clearFavorites());
    expect(state.items).toHaveLength(0);
  });
});


