export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductsState {
  items: Product[];
  categories: string[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
}

export interface FiltersState {
  searchQuery: string;
  selectedCategory: string;
  sortBy: 'default' | 'price-low' | 'price-high';
}

export interface FavoritesState {
  items: Product[];
}

export interface RootState {
  products: ProductsState;
  filters: FiltersState;
  favorites: FavoritesState;
}

