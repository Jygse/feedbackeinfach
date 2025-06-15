import React from 'react';
import { Send, Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  isLoading: boolean;
  disabled: boolean;
  onClick: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading, disabled, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        w-full py-4 px-6 rounded-xl font-medium text-white
        transition-all duration-200 flex items-center justify-center space-x-2
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        ${disabled || isLoading
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-indigo-500 hover:bg-indigo-600 hover:shadow-lg active:scale-[0.98]'
        }
      `}
      aria-label={isLoading ? 'Sending feedback...' : 'Send feedback'}
    >
      {isLoading ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          <span>Sending...</span>
        </>
      ) : (
        <>
          <Send size={20} />
          <span>Send</span>
        </>
      )}
    </button>
  );
};