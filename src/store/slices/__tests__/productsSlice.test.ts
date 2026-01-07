import { describe, it, expect } from "vitest";
import productsReducer, {
  loadProducts,
  loadProductById,
  loadCategories,
  clearCurrentProduct,
} from "../productsSlice";
import type { ProductsState, Product } from "../../../types";

describe("productsSlice", () => {
  const initialState: ProductsState = {
    items: [],
    categories: [],
    currentProduct: null,
    loading: false,
    error: null,
  };

  it("should return initial state", () => {
    expect(productsReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle loadProducts.pending", () => {
    const action = { type: loadProducts.pending.type };
    const state = productsReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("should handle loadProducts.fulfilled", () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        title: "Product 1",
        price: 10,
        description: "",
        category: "cat",
        image: "",
        rating: { rate: 4, count: 10 },
      },
      {
        id: 2,
        title: "Product 2",
        price: 20,
        description: "",
        category: "cat",
        image: "",
        rating: { rate: 5, count: 5 },
      },
    ];
    const action = {
      type: loadProducts.fulfilled.type,
      payload: mockProducts,
    };
    const state = productsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.items).toEqual(mockProducts);
  });

  it("should handle loadProducts.rejected", () => {
    const errorMessage = "Failed to fetch products";
    const action = {
      type: loadProducts.rejected.type,
      payload: errorMessage,
    };
    const state = productsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it("should handle loadProductById.fulfilled", () => {
    const mockProduct: Product = {
      id: 1,
      title: "Product 1",
      price: 10,
      description: "",
      category: "cat",
      image: "",
      rating: { rate: 4, count: 10 },
    };
    const action = {
      type: loadProductById.fulfilled.type,
      payload: mockProduct,
    };
    const state = productsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.currentProduct).toEqual(mockProduct);
  });

  it("should handle loadCategories.fulfilled", () => {
    const mockCategories = ["electronics", "jewelery", "clothing"];
    const action = {
      type: loadCategories.fulfilled.type,
      payload: mockCategories,
    };
    const state = productsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.categories).toEqual(mockCategories);
  });

  it("should handle clearCurrentProduct", () => {
    const stateWithProduct: ProductsState = {
      ...initialState,
      currentProduct: {
        id: 1,
        title: "Product 1",
        price: 10,
        description: "",
        category: "cat",
        image: "",
        rating: { rate: 4, count: 10 },
      },
    };
    const action = clearCurrentProduct();
    const state = productsReducer(stateWithProduct, action);
    expect(state.currentProduct).toBeNull();
  });

  it("should handle loadProductById.pending", () => {
    const action = { type: loadProductById.pending.type };
    const state = productsReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("should handle loadProductById.rejected", () => {
    const errorMessage = "Failed to fetch product by ID";
    const action = {
      type: loadProductById.rejected.type,
      payload: errorMessage,
    };
    const state = productsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it("should handle loadCategories.pending", () => {
    const action = { type: loadCategories.pending.type };
    const state = productsReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("should handle loadCategories.rejected", () => {
    const errorMessage = "Failed to fetch categories";
    const action = {
      type: loadCategories.rejected.type,
      payload: errorMessage,
    };
    const state = productsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
