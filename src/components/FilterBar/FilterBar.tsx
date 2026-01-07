import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSelectedCategory, setSortBy } from '../../store/slices/filtersSlice';
import { loadCategories } from '../../store/slices/productsSlice';
import { selectCategories, selectSelectedCategory, selectSortBy } from '../../store/selectors';
import { useEffect } from 'react';
import { CategoryIcon, SortIcon } from '../../assets/icons';

const FilterBar = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const sortBy = useAppSelector(selectSortBy);

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  const capitalizeCategory = (category: string): string => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="glass-effect p-6 rounded-2xl shadow-dark-lg mb-8 border border-dark-700/50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="category-filter"
            className="text-sm font-bold text-dark-200 mb-3 flex items-center gap-2"
          >
            <CategoryIcon className="w-5 h-5 text-primary-400" />
            Category
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
            className="select-field font-medium"
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {capitalizeCategory(category)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="sort-filter"
            className="text-sm font-bold text-dark-200 mb-3 flex items-center gap-2"
          >
            <SortIcon className="w-5 h-5 text-accent-400" />
            Sort By
          </label>
          <select
            id="sort-filter"
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value as 'default' | 'price-low' | 'price-high'))}
            className="select-field font-medium"
            aria-label="Sort products"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
