import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchProducts, fetchProductById, fetchCategories } from "../api";
import type { Product } from "../../types";

describe("API Service", () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      title: "Product 1",
      price: 10,
      description: "Desc 1",
      category: "cat1",
      image: "img1",
      rating: { rate: 4, count: 10 },
    },
    {
      id: 2,
      title: "Product 2",
      price: 20,
      description: "Desc 2",
      category: "cat2",
      image: "img2",
      rating: { rate: 5, count: 5 },
    },
  ];

  const mockCategories = ["cat1", "cat2"];

  beforeEach(() => {
    // Mock fetch in JSDOM environment
    // @ts-ignore
    window.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetchProducts should return list of products", async () => {
    // @ts-ignore
    (window.fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    const products = await fetchProducts();
    expect(products).toEqual(mockProducts);
    expect(window.fetch).toHaveBeenCalledWith(
      "https://fakestoreapi.com/products"
    );
  });

  it("fetchProducts should throw error if response is not ok", async () => {
    // @ts-ignore
    (window.fetch as vi.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchProducts()).rejects.toThrow("Failed to fetch products");
  });

  it("fetchProductById should return a single product", async () => {
    const product = mockProducts[0];

    // @ts-ignore
    (window.fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => product,
    });

    const result = await fetchProductById(1);
    expect(result).toEqual(product);
    expect(window.fetch).toHaveBeenCalledWith(
      "https://fakestoreapi.com/products/1"
    );
  });

  it("fetchProductById should throw error if response is not ok", async () => {
    // @ts-ignore
    (window.fetch as vi.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchProductById(1)).rejects.toThrow(
      "Failed to fetch product"
    );
  });

  it("fetchCategories should return categories list", async () => {
    // @ts-ignore
    (window.fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCategories,
    });

    const categories = await fetchCategories();
    expect(categories).toEqual(mockCategories);
    expect(window.fetch).toHaveBeenCalledWith(
      "https://fakestoreapi.com/products/categories"
    );
  });

  it("fetchCategories should throw error if response is not ok", async () => {
    // @ts-ignore
    (window.fetch as vi.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchCategories()).rejects.toThrow(
      "Failed to fetch categories"
    );
  });
});
