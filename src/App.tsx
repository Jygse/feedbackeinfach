import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';
import { StarRating } from './components/StarRating';
import { CommentField } from './components/CommentField';
import { SubmitButton } from './components/SubmitButton';
import { StatusMessage } from './components/StatusMessage';
import { useTheme } from './hooks/useTheme';
import { submitFeedback } from './services/feedbackService';

function App() {
  const { isDark, toggleTheme } = useTheme();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [validationError, setValidationError] = useState('');

  const handleClose = () => {
    // In a real app, this might close a modal or navigate away
    if (window.confirm('Are you sure you want to close? Your feedback will be lost.')) {
      setRating(0);
      setComment('');
      setStatus(null);
      setValidationError('');
    }
  };

  const validateForm = (): boolean => {
    if (rating === 0) {
      setValidationError('Please select a rating');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setStatus(null);

    try {
      await submitFeedback(rating, comment);
      setStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setRating(0);
        setComment('');
        setStatus(null);
      }, 3000);
      
    } catch (error) {
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setStatus(null);
    handleSubmit();
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className={`
          w-full max-w-md rounded-2xl shadow-xl transition-all duration-300
          ${isDark ? 'bg-gray-800 shadow-black/20' : 'bg-white shadow-gray-200/50'}
        `}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4">
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Share your feedback
            </h1>
            <button
              onClick={handleClose}
              className={`
                p-2 rounded-full transition-colors duration-200
                ${isDark 
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }
                focus:outline-none focus:ring-2 focus:ring-indigo-500
              `}
              aria-label="Close feedback form"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form Content */}
          <div className="px-6 pb-6 space-y-6">
            {/* Star Rating */}
            <StarRating rating={rating} onRatingChange={setRating} isDark={isDark} />

            {/* Validation Error */}
            {validationError && (
              <div className={`text-sm font-medium ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                {validationError}
              </div>
            )}

            {/* Comment Field */}
            <CommentField comment={comment} onCommentChange={setComment} isDark={isDark} />

            {/* Status Message */}
            <StatusMessage type={status} onRetry={handleRetry} isDark={isDark} />

            {/* Submit Button */}
            <SubmitButton 
              isLoading={isLoading} 
              disabled={status === 'success'} 
              onClick={handleSubmit} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;