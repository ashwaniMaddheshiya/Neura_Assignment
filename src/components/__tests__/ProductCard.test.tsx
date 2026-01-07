import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import productsReducer from "../../store/slices/productsSlice";
import filtersReducer from "../../store/slices/filtersSlice";
import favoritesReducer from "../../store/slices/favoritesSlice";
import type { Product, RootState } from "../../types";

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

const renderWithProviders = (
  ui: React.ReactNode,
  store = createMockStore()
) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

describe("ProductCard", () => {
  const product: Product = {
    id: 1,
    title: "Test Product",
    price: 99.99,
    description: "Test description",
    category: "electronics",
    image: "https://example.com/image.jpg",
    rating: { rate: 4.5, count: 100 },
  };

  it("renders product information", () => {
    const store = createMockStore();
    renderWithProviders(<ProductCard product={product} />, store);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByText("electronics")).toBeInTheDocument();
  });

  it("renders image with correct alt text", () => {
    const store = createMockStore();
    renderWithProviders(<ProductCard product={product} />, store);

    const img = screen.getByAltText("Test Product");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", product.image);
  });

  it("links to product detail page", () => {
    const store = createMockStore();
    renderWithProviders(<ProductCard product={product} />, store);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/product/1");
  });

  it("renders favorite button and toggles favorite", () => {
    const store = createMockStore({
      products: {
        items: [],
        categories: [],
        currentProduct: null,
        loading: false,
        error: null,
      },
      filters: {
        searchQuery: "",
        selectedCategory: "",
        sortBy: "default",
      },
      favorites: {
        items: [],
      },
    });

    renderWithProviders(<ProductCard product={product} />, store);

    const favBtn = screen.getByRole("button", {
      name: /Add to favorites/i,
    });

    expect(favBtn).toBeInTheDocument();

    fireEvent.click(favBtn);

    // Check that the product was added to favorites
    const updatedStore = store.getState();
    const favoriteIds = updatedStore.favorites.items.map((p) => p.id);
    expect(favoriteIds).toContain(product.id);
  });

  it("handles missing category gracefully", () => {
    const productNoCategory = { ...product, category: "" };
    const store = createMockStore();
    renderWithProviders(<ProductCard product={productNoCategory} />, store);

    // The category <p> should have empty text
    const categoryElement = screen.getByText("", { selector: "p" });
    expect(categoryElement).toBeInTheDocument();
  });
});
