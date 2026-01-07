import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectFavorites } from '../../store/selectors';
import { ProductsIcon, HeartIcon } from '../../assets/icons';

const Navbar = () => {
  const location = useLocation();
  const favorites = useAppSelector(selectFavorites);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-dark-800/80 backdrop-blur-xl shadow-dark-400 sticky top-0 z-50 border-b border-dark-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-bold gradient-text hover:scale-105 transition-transform duration-300 flex items-center gap-2"
          >
            <span className="text-3xl sm:text-4xl">✨</span>
            <span className="hidden sm:inline">ProductHub</span>
            <span className="sm:hidden">PH</span>
          </Link>
          <div className="flex space-x-2 sm:space-x-3">
            <Link
              to="/"
              className={`px-3 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-300 relative ${
                isActive('/')
                  ? 'bg-gradient-primary text-white shadow-glow scale-105'
                  : 'text-dark-300 hover:text-dark-100 hover:bg-dark-700/50 hover:scale-105'
              }`}
              aria-current={isActive('/') ? 'page' : undefined}
              title="Products"
            >
              <span className="hidden sm:inline">Products</span>
              <ProductsIcon className="sm:hidden w-6 h-6" />
            </Link>
            <Link
              to="/favorites"
              className={`px-3 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-300 relative ${
                isActive('/favorites')
                  ? 'bg-gradient-accent text-white shadow-glow-accent scale-105'
                  : 'text-dark-300 hover:text-dark-100 hover:bg-dark-700/50 hover:scale-105'
              }`}
              aria-current={isActive('/favorites') ? 'page' : undefined}
              title="Favorites"
            >
              <span className="hidden sm:flex sm:items-center sm:gap-2">
                Favorites
                {favorites.length > 0 && (
                  <span className="bg-gradient-accent text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-glow-accent">
                    {favorites.length}
                  </span>
                )}
              </span>
              <span className="sm:hidden relative flex items-center">
                <HeartIcon className="w-6 h-6" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-glow-accent text-[10px]">
                    {favorites.length}
                  </span>
                )}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
