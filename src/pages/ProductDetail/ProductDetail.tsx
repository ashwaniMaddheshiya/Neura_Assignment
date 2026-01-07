import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadProductById, clearCurrentProduct } from '../../store/slices/productsSlice';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../store/slices/favoritesSlice';
import {
  selectCurrentProduct,
  selectProductsLoading,
  selectProductsError,
  selectIsFavorite,
} from '../../store/selectors';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { formatPrice } from '../../utils/formatPrice';
import { HeartIcon, StarIcon } from '../../assets/icons';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectCurrentProduct);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);
  const isFavorite = useAppSelector((state) =>
    product ? selectIsFavorite(state, product.id) : false
  );

  useEffect(() => {
    if (id) {
      dispatch(loadProductById(id));
    }

    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [id, dispatch]);

  const handleFavoriteToggle = () => {
    if (product) {
      if (isFavorite) {
        dispatch(removeFromFavorites(product.id));
      } else {
        dispatch(addToFavorites(product));
      }
    }
  };

  const handleRetry = () => {
    if (id) {
      dispatch(loadProductById(id));
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  if (!product) {
    return (
      <div className="glass-effect rounded-2xl shadow-dark-lg p-12 text-center border border-dark-700/50 animate-scale-in">
        <div className="text-6xl mb-4">😕</div>
        <p className="text-dark-200 text-xl font-bold mb-4">Product not found</p>
        <button onClick={() => navigate('/')} className="btn-primary">
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="glass-effect rounded-2xl shadow-dark-lg overflow-hidden border border-dark-700/50 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-8 lg:p-12">
        <div className="flex items-center justify-center bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl p-8 lg:p-12 border border-dark-700/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-glow opacity-50"></div>
          <img
            src={product.image}
            alt={product.title}
            className="max-w-full max-h-96 object-contain relative z-10 drop-shadow-2xl animate-float"
          />
        </div>
        <div className="flex flex-col justify-center animate-slide-up">
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-dark-100 flex-1 pr-4">
              {product.title}
            </h1>
            <button
              onClick={handleFavoriteToggle}
              className={`p-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900 ${
                isFavorite
                  ? 'bg-red-500/20 hover:bg-red-500/30 focus:ring-red-500 border border-red-500/50 shadow-glow-accent'
                  : 'bg-dark-800 hover:bg-dark-700 focus:ring-primary-500 border border-dark-700/50'
              }`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <HeartIcon
                className={`w-8 h-8 transition-all duration-300 ${
                  isFavorite ? 'text-red-400 fill-current scale-110' : 'text-dark-400'
                }`}
              />
            </button>
          </div>

          <div className="mb-6">
            <span className="inline-block bg-gradient-accent text-white text-sm font-bold px-4 py-2 rounded-full shadow-glow-accent">
              {product.category.toUpperCase()}
            </span>
          </div>

          <div className="mb-6 flex items-center gap-4">
            <div className="flex items-center bg-dark-800/50 px-4 py-2 rounded-full border border-dark-700/50">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(product.rating?.rate || 0)
                      ? 'text-yellow-400 fill-current'
                      : 'text-dark-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-dark-300 font-semibold">
              {product.rating?.rate?.toFixed(1) || 'N/A'} ({product.rating?.count || 0} reviews)
            </span>
          </div>

          <div className="mb-8">
            <p className="text-5xl font-bold gradient-text mb-2">
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-dark-100 mb-4">Description</h2>
            <p className="text-dark-300 leading-relaxed text-lg">{product.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/')}
              className="btn-secondary flex-1"
            >
              ← Back to Products
            </button>
            <button
              onClick={handleFavoriteToggle}
              className={`flex-1 ${
                isFavorite ? 'btn-accent' : 'btn-primary'
              }`}
            >
              {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
