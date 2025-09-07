// src/components/TranscriptionResult/TranscriptionResult.jsx
import { Captions,ClipboardList } from 'lucide-react';
const TranscriptionResult = ({ transcription, loading }) => {
  const copyToClipboard = () => {
    if (transcription) {
      navigator.clipboard.writeText(transcription);
      // You could add a toast notification here
    }
  };

  return (
    <div className="w-full bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center justify-center gap-2 text-xl font-semibold text-white">
          <Captions className='w-7 h-7'/> Transcription Result</h2>
        {transcription && !loading && (
          <button
            onClick={copyToClipboard}
            className="flex items-center justify-center gap-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
            title="Copy to clipboard"
          >
            <ClipboardList/> Copy
          </button>
        )}
      </div>
      
      <div className="min-h-[120px] p-4 bg-gray-900 rounded-lg border border-gray-600">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
              <p className="text-yellow-400">Processing transcription...</p>
            </div>
          </div>
        ) : transcription ? (
          <p className="text-gray-100 whitespace-pre-wrap leading-relaxed">
            {transcription}
          </p>
        ) : (
          <p className="text-gray-500 italic text-center">
            Upload an audio file or record to see transcription here
          </p>
        )}
      </div>
    </div>
  );
};

export default TranscriptionResult;