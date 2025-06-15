import React from 'react';

interface CommentFieldProps {
  comment: string;
  onCommentChange: (comment: string) => void;
  isDark: boolean;
}

export const CommentField: React.FC<CommentFieldProps> = ({ comment, onCommentChange, isDark }) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  React.useEffect(() => {
    adjustHeight();
  }, [comment]);

  return (
    <div className="space-y-3">
      <label 
        htmlFor="comment"
        className={`text-lg font-medium block ${isDark ? 'text-white' : 'text-gray-900'}`}
      >
        Comment <span className={`text-sm font-normal ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>(Optional)</span>
      </label>
      
      <textarea
        ref={textareaRef}
        id="comment"
        value={comment}
        onChange={(e) => onCommentChange(e.target.value)}
        onInput={adjustHeight}
        placeholder="Enter your message"
        rows={3}
        className={`
          w-full px-4 py-3 rounded-xl border transition-all duration-200 resize-none overflow-hidden
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
          ${isDark
            ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 hover:border-gray-500'
            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 hover:border-gray-300'
          }
        `}
        aria-describedby="comment-description"
      />
      <p id="comment-description" className="sr-only">
        Optional field for additional feedback or comments
      </p>
    </div>
  );
};