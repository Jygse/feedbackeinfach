import React from 'react';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

interface StatusMessageProps {
  type: 'success' | 'error' | null;
  onRetry?: () => void;
  isDark: boolean;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ type, onRetry, isDark }) => {
  if (!type) return null;

  return (
    <div className={`
      p-4 rounded-xl border transition-all duration-300
      ${type === 'success'
        ? 'bg-green-50 border-green-200 text-green-800'
        : isDark
        ? 'bg-red-900/20 border-red-800 text-red-400'
        : 'bg-red-50 border-red-200 text-red-800'
      }
    `}>
      <div className="flex items-center space-x-3">
        {type === 'success' ? (
          <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
        ) : (
          <XCircle size={20} className={`flex-shrink-0 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
        )}
        
        <div className="flex-1">
          <p className="font-medium">
            {type === 'success' 
              ? 'Thank you for your feedback!' 
              : 'Something went wrong. Please try again.'
            }
          </p>
        </div>

        {type === 'error' && onRetry && (
          <button
            onClick={onRetry}
            className={`
              flex items-center space-x-1 px-3 py-1 rounded-lg
              transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500
              ${isDark
                ? 'bg-red-800 hover:bg-red-700 text-red-200'
                : 'bg-red-100 hover:bg-red-200 text-red-700'
              }
            `}
            aria-label="Retry sending feedback"
          >
            <RefreshCw size={16} />
            <span>Retry</span>
          </button>
        )}
      </div>
    </div>
  );
};