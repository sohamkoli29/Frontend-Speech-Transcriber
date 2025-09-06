// src/components/HistoryItem/HistoryItem.jsx
import { useState } from "react";

const HistoryItem = ({ item, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(item.transcription);
    // You could add a toast notification here
  };

  const handleDelete = () => {
    onDelete(item._id);
    setShowDeleteConfirm(false);
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white truncate">
            📄 {item.filename || "Untitled Recording"}
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            {formatDate(item.createdAt)}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={copyToClipboard}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            title="Copy transcription"
          >
            📋
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
            title="Delete item"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="text-gray-300">
        {isExpanded ? (
          <p className="whitespace-pre-wrap leading-relaxed">
            {item.transcription}
          </p>
        ) : (
          <p className="leading-relaxed">
            {truncateText(item.transcription)}
          </p>
        )}
      </div>

      {item.transcription.length > 150 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this transcription? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryItem;