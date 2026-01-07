import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts, fetchProductById, fetchCategories } from '../../services/api';
import type { Product, ProductsState } from '../../types';

// Async thunks
export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async (_, { rejectWithValue }) => {
    try {
      const products = await fetchProducts();
      return products;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const loadProductById = createAsyncThunk(
  'products/loadProductById',
  async (productId: number | string, { rejectWithValue }) => {
    try {
      const product = await fetchProductById(productId);
      return product;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const loadCategories = createAsyncThunk(
  'products/loadCategories',
  async (_, { rejectWithValue }) => {
    try {
      const categories = await fetchCategories();
      return categories;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const initialState: ProductsState = {
  items: [],
  categories: [],
  currentProduct: null,
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load products
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Load product by ID
      .addCase(loadProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(loadProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Load categories
      .addCase(loadCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCategories.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentProduct } = productsSlice.actions;
export default productsSlice.reducer;

