import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import Favorites from "../Favorites/Favorites";
import productsReducer from "../../store/slices/productsSlice";
import filtersReducer from "../../store/slices/filtersSlice";
import favoritesReducer, {
  addToFavorites,
} from "../../store/slices/favoritesSlice";
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

const renderWithProviders = (ui: React.ReactNode, store = createMockStore()) =>
  render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );

describe("Favorites integration", () => {
  const product1: Product = {
    id: 1,
    title: "Laptop",
    price: 999,
    description: "",
    category: "electronics",
    image: "laptop.jpg",
    rating: { rate: 4.5, count: 100 },
  };

  const product2: Product = {
    id: 2,
    title: "Phone",
    price: 599,
    description: "",
    category: "electronics",
    image: "phone.jpg",
    rating: { rate: 4.8, count: 200 },
  };

  it("shows empty state when there are no favorites", () => {
    const store = createMockStore();
    renderWithProviders(<Favorites />, store);
    expect(screen.getByText(/no favorites yet/i)).toBeInTheDocument();
  });

  it("shows favorite products", () => {
    const store = createMockStore();
    store.dispatch(addToFavorites(product1));
    store.dispatch(addToFavorites(product2));

    renderWithProviders(<Favorites />, store);

    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText(/2 favorites?/i)).toBeInTheDocument();
  });

  it("clears all favorites", async () => {
    const user = userEvent.setup();
    const store = createMockStore();
    store.dispatch(addToFavorites(product1));
    store.dispatch(addToFavorites(product2));

    renderWithProviders(<Favorites />, store);

    const clearButton = screen.getByLabelText(/remove all favorites/i);

    await user.click(clearButton);

    expect(store.getState().favorites.items).toHaveLength(0);
  });
});
