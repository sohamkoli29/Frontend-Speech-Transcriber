// src/components/LoadingSpinner/LoadingSpinner.jsx
const LoadingSpinner = ({ size = "md", text = "Loading..." }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <div
        className={`animate-spin rounded-full border-2 border-blue-500 border-t-transparent ${sizeClasses[size]}`}
      ></div>
      <p className="text-gray-300 text-sm">{text}</p>
    </div>
  );
};

export default LoadingSpinner;