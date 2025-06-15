import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  isDark: boolean;
}

const ratingLabels = ['Terrible', 'Poor', 'Average', 'Good', 'Amazing'];

export const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, isDark }) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const handleStarClick = (starRating: number) => {
    onRatingChange(starRating);
  };

  const handleStarHover = (starRating: number) => {
    setHoverRating(starRating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Rate your experience
      </h3>
      
      <div className="flex justify-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
            onMouseLeave={handleStarLeave}
            className="transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"
            aria-label={`Rate ${star} star${star > 1 ? 's' : ''} - ${ratingLabels[star - 1]}`}
          >
            <Star
              size={32}
              className={`transition-all duration-200 ${
                star <= displayRating
                  ? 'fill-indigo-500 text-indigo-500'
                  : isDark
                  ? 'text-gray-600 hover:text-gray-500'
                  : 'text-gray-300 hover:text-gray-400'
              }`}
            />
          </button>
        ))}
      </div>

      <div className="flex justify-between text-sm px-2">
        {ratingLabels.map((label, index) => (
          <span
            key={label}
            className={`transition-colors duration-200 ${
              displayRating === index + 1
                ? 'text-indigo-500 font-medium'
                : isDark
                ? 'text-gray-400'
                : 'text-gray-500'
            }`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};