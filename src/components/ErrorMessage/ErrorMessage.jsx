// src/components/ErrorMessage/ErrorMessage.jsx
import { useState, useEffect } from "react";

const ErrorMessage = ({ 
  message, 
  type = "error", 
  dismissible = true, 
  duration = 5000,
  onDismiss,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    setIsAnimating(true);
    
    if (duration && dismissible) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, dismissible, onDismiss]);

  if (!isVisible || !message) return null;

  const typeStyles = {
    error: {
      container: "bg-red-500/10 border-red-500/30 text-red-400",
      icon: "❌",
      iconBg: "bg-red-500/20"
    },
    warning: {
      container: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
      icon: "⚠️",
      iconBg: "bg-yellow-500/20"
    },
    info: {
      container: "bg-blue-500/10 border-blue-500/30 text-blue-400",
      icon: "ℹ️",
      iconBg: "bg-blue-500/20"
    },
    success: {
      container: "bg-green-500/10 border-green-500/30 text-green-400",
      icon: "✅",
      iconBg: "bg-green-500/20"
    }
  };

  const currentStyle = typeStyles[type];

  const handleDismiss = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, 150); // Wait for exit animation
  };

  return (
    <div className={`
      border rounded-xl p-4 mb-4 flex items-start justify-between transition-all duration-300 shadow-sm
      ${currentStyle.container}
      ${isAnimating ? 'animate-in slide-in-from-top-2 fade-in' : 'animate-out slide-out-to-top-2 fade-out'}
      ${className}
    `}>
      <div className="flex items-start space-x-3 flex-1 min-w-0">
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
          ${currentStyle.iconBg}
        `}>
          <span className="text-sm">
            {currentStyle.icon}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-relaxed break-words">
            {message}
          </p>
        </div>
      </div>
      
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-gray-700/20"
          aria-label="Dismiss"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

// Toast-style error message for global notifications
export const ErrorToast = ({ 
  message, 
  type = "error", 
  position = "top-right",
  onDismiss 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (!isVisible) return null;

  const positionClasses = {
    'top-right': 'fixed top-4 right-4 z-50',
    'top-left': 'fixed top-4 left-4 z-50',
    'top-center': 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50',
    'bottom-right': 'fixed bottom-4 right-4 z-50',
    'bottom-left': 'fixed bottom-4 left-4 z-50',
    'bottom-center': 'fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50'
  };

  return (
    <div className={`${positionClasses[position]} max-w-md`}>
      <ErrorMessage
        message={message}
        type={type}
        onDismiss={onDismiss}
        className="shadow-2xl border-2"
      />
    </div>
  );
};

// Inline validation error for form fields
export const FieldError = ({ message, show = true }) => {
  if (!show || !message) return null;

  return (
    <div className="mt-1 flex items-center space-x-1 text-red-400">
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="text-xs font-medium">{message}</span>
    </div>
  );
};

// Multiple errors container
export const ErrorList = ({ errors = [], onDismissError, className = "" }) => {
  if (!errors.length) return null;

  return (
    <div className={`space-y-2 ${className}`}>
      {errors.map((error, index) => (
        <ErrorMessage
          key={index}
          message={error}
          type="error"
          onDismiss={() => onDismissError?.(index)}
        />
      ))}
    </div>
  );
};

export default ErrorMessage;