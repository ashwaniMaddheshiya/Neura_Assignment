import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { setSearchQuery } from '../../store/slices/filtersSlice';
import { useDebounce } from '../../hooks/useDebounce';
import { SearchIcon, CloseIcon } from '../../assets/icons';

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [localQuery, setLocalQuery] = useState<string>('');
  const debouncedQuery = useDebounce(localQuery, 500);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedQuery));
  }, [debouncedQuery, dispatch]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
        <SearchIcon className="h-6 w-6 text-primary-400" />
      </div>
      <input
        type="text"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder="Search products by title..."
        className="input-field pl-12 text-lg"
        aria-label="Search products"
      />
      {localQuery && (
        <button
          onClick={() => setLocalQuery('')}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-dark-500 hover:text-dark-300 transition-colors duration-200 z-10"
          aria-label="Clear search"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
