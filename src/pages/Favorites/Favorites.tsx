import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeFromFavorites } from '../../store/slices/favoritesSlice';
import { selectFavorites } from '../../store/selectors';
import ProductCard from '../../components/ProductCard/ProductCard';
import { HeartIcon } from '../../assets/icons';

const Favorites = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleRemoveAll = () => {
    favorites.forEach((product) => {
      dispatch(removeFromFavorites(product.id));
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="section-title animate-slide-down">My Favorites</h1>
          <p className="section-subtitle animate-fade-in" style={{ animationDelay: '0.2s' }}>Your saved products collection</p>
        </div>
        {favorites.length > 0 && (
          <button
            onClick={handleRemoveAll}
            className="btn-secondary whitespace-nowrap animate-scale-in"
            style={{ animationDelay: '0.3s' }}
            aria-label="Remove all favorites"
          >
            🗑️ Clear All
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="glass-effect rounded-2xl shadow-dark-lg p-16 text-center border border-dark-700/50 animate-scale-in">
          <div className="text-8xl mb-6 animate-float">💔</div>
          <p className="text-dark-200 text-2xl font-bold mb-3">No favorites yet</p>
          <p className="text-dark-400 text-lg mb-6">
            Start adding products to your favorites to see them here.
          </p>
          <a
            href="/"
            className="btn-primary inline-block"
          >
            Browse Products
          </a>
        </div>
      ) : (
        <>
          <div className="mb-6 text-dark-300 font-medium text-lg flex items-center gap-2 animate-fade-in">
            <HeartIcon className="w-6 h-6 text-accent-400" />
            {favorites.length} favorite{favorites.length !== 1 ? 's' : ''}
          </div>
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${isMounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
