import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import SearchBar from "../SearchBar/SearchBar";
import productsReducer from "../../store/slices/productsSlice";
import filtersReducer from "../../store/slices/filtersSlice";
import favoritesReducer from "../../store/slices/favoritesSlice";

const createMockStore = () =>
  configureStore({
    reducer: {
      products: productsReducer,
      filters: filtersReducer,
      favorites: favoritesReducer,
    },
  });

const renderWithProviders = (ui: React.ReactNode, store = createMockStore()) =>
  render(<Provider store={store}>{ui}</Provider>);

describe("SearchBar", () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore();
  });

  it("renders search input", () => {
    renderWithProviders(<SearchBar />, store);
    expect(
      screen.getByPlaceholderText(/search products by title/i)
    ).toBeInTheDocument();
  });

  it("updates debounced search query in store", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SearchBar />, store);

    const input = screen.getByPlaceholderText(/search products by title/i);
    await user.type(input, "laptop");

    expect(store.getState().filters.searchQuery).toBe("");

    await waitFor(
      () => {
        expect(store.getState().filters.searchQuery).toBe("laptop");
      },
      { timeout: 1000 }
    );
  });
});
