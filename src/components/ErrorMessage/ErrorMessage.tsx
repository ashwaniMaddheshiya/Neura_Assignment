import { ErrorCircleIcon } from '../../assets/icons';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="bg-dark-800/60 backdrop-blur-md border-2 border-red-500/30 rounded-2xl p-8 text-center shadow-dark-lg">
      <div className="text-red-400 mb-4">
        <ErrorCircleIcon className="mx-auto h-16 w-16 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
      </div>
      <p className="text-red-300 font-bold text-xl mb-2">{message}</p>
      <p className="text-dark-400 mb-6">Please try again or check your connection.</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
