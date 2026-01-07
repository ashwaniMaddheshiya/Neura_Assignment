import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadProducts } from '../../store/slices/productsSlice';
import {
  selectFilteredProducts,
  selectProductsLoading,
  selectProductsError,
} from '../../store/selectors';
import ProductCard from '../../components/ProductCard/ProductCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterBar from '../../components/FilterBar/FilterBar';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const ProductListing = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectFilteredProducts);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    dispatch(loadProducts());
    // Small delay to prevent flickering
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(loadProducts());
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="section-title animate-slide-down">Discover Products</h1>
        <p className="section-subtitle animate-fade-in" style={{ animationDelay: '0.2s' }}>Explore our amazing collection of products</p>
      </div>
      
      <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <SearchBar />
      </div>

      <div style={{ animationDelay: '0.4s' }} className="animate-slide-up">
        <FilterBar />
      </div>

      {loading && <LoadingSpinner />}

      {error && <ErrorMessage message={error} onRetry={handleRetry} />}

      {!loading && !error && (
        <>
          <div className="mb-6 text-dark-300 font-medium text-lg flex items-center gap-2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {/* Using a simple icon-like indicator instead of inline SVG here to keep icons centralized */}
            <span className="w-2 h-2 rounded-full bg-primary-400 inline-block" />
            Showing {products.length} product{products.length !== 1 ? 's' : ''}
          </div>
          {products.length === 0 ? (
            <div className="glass-effect rounded-2xl shadow-dark-lg p-12 text-center border border-dark-700/50 animate-scale-in">
              <div className="text-6xl mb-4 animate-float">🔍</div>
              <p className="text-dark-200 text-xl font-bold mb-2">No products found</p>
              <p className="text-dark-400">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${isMounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductListing;
