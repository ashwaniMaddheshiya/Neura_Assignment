import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import ProductListing from '../ProductListing/ProductListing';
import productsReducer from '../../store/slices/productsSlice';
import filtersReducer from '../../store/slices/filtersSlice';
import favoritesReducer from '../../store/slices/favoritesSlice';
import * as api from '../../services/api';
import type { RootState } from '../../types';

vi.mock('../../services/api');

const rootReducer = combineReducers({
  products: productsReducer,
  filters: filtersReducer,
  favorites: favoritesReducer,
});

const createMockStore = (preloadedState?: RootState) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

const renderWithProviders = (ui: React.ReactNode, store = createMockStore()) =>
  render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>,
  );

describe('ProductListing integration', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Laptop',
      price: 999,
      category: 'electronics',
      description: '',
      image: 'laptop.jpg',
      rating: { rate: 4.5, count: 100 },
    },
    {
      id: 2,
      title: 'T-Shirt',
      price: 19,
      category: 'clothing',
      description: '',
      image: 'tshirt.jpg',
      rating: { rate: 4, count: 50 },
    },
    {
      id: 3,
      title: 'Phone',
      price: 599,
      category: 'electronics',
      description: '',
      image: 'phone.jpg',
      rating: { rate: 4.8, count: 200 },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(api.fetchProducts).mockResolvedValue(mockProducts);
    vi.mocked(api.fetchCategories).mockResolvedValue([
      'electronics',
      'clothing',
    ]);
  });

  it('loads and displays products', async () => {
    const store = createMockStore();
    renderWithProviders(<ProductListing />, store);

    await waitFor(() => {
      expect(screen.getByText('Laptop')).toBeInTheDocument();
      expect(screen.getByText('T-Shirt')).toBeInTheDocument();
      expect(screen.getByText('Phone')).toBeInTheDocument();
    });
  });

  it('filters products by search query', async () => {
    const user = userEvent.setup();
    const store = createMockStore();
    renderWithProviders(<ProductListing />, store);

    await waitFor(() => {
      expect(screen.getByText('Laptop')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(
      /search products by title/i,
    );
    await user.type(searchInput, 'laptop');

    await waitFor(() => {
      expect(screen.getByText('Laptop')).toBeInTheDocument();
      expect(screen.queryByText('T-Shirt')).not.toBeInTheDocument();
    });
  });

  it('filters products by category', async () => {
    const user = userEvent.setup();
    const store = createMockStore();
    renderWithProviders(<ProductListing />, store);

    await waitFor(() => {
      expect(screen.getByText('Laptop')).toBeInTheDocument();
    });

    const categorySelect = screen.getByLabelText(/filter by category/i);
    await user.selectOptions(categorySelect, 'electronics');

    await waitFor(() => {
      expect(screen.getByText('Laptop')).toBeInTheDocument();
      expect(screen.getByText('Phone')).toBeInTheDocument();
      expect(screen.queryByText('T-Shirt')).not.toBeInTheDocument();
    });
  });
});


