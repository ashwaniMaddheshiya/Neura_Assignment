const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[400px]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-dark-700 rounded-full animate-spin border-t-primary-500"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent rounded-full border-t-accent-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
      </div>
      <p className="mt-6 text-dark-400 font-medium text-lg animate-pulse">Loading products...</p>
    </div>
  );
};

export default LoadingSpinner;
