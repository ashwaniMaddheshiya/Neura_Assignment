import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToFavorites, removeFromFavorites } from '../../store/slices/favoritesSlice';
import { selectIsFavorite } from '../../store/selectors';
import { formatPrice } from '../../utils/formatPrice';
import type { Product } from '../../types';
import { HeartIcon, StarIcon } from '../../assets/icons';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) => selectIsFavorite(state, product.id));

  const handleFavoriteToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  return (
    <div className="card-hover group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <div className="aspect-square bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center p-6 border-b border-dark-700/50">
            <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain relative z-10 group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <button
            onClick={handleFavoriteToggle}
            className="absolute top-4 right-4 p-3 bg-dark-800/90 backdrop-blur-md rounded-full shadow-dark-lg hover:bg-dark-700 hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 z-20 border border-dark-700/50"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <HeartIcon
              className={`w-6 h-6 transition-all duration-200 ${
                isFavorite
                  ? 'text-red-400 fill-current scale-110 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]'
                  : 'text-dark-400 hover:text-red-400'
              }`}
            />
          </button>
          {isFavorite && (
            <div className="absolute top-4 left-4 bg-gradient-accent text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-glow-accent">
              ⭐ Favorite
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="font-bold text-lg mb-3 line-clamp-2 min-h-[3.5rem] text-dark-100 group-hover:text-primary-400 transition-colors duration-200">
            {product.title}
          </h3>
          <p className="text-primary-400 text-sm font-medium mb-4 uppercase tracking-wide">
            {product.category}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold gradient-text">
              {formatPrice(product.price)}
            </span>
            <div className="flex items-center gap-1 bg-dark-800/50 px-3 py-1.5 rounded-full border border-dark-700/50">
              <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-semibold text-dark-200">
                {product.rating?.rate?.toFixed(1) || 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
