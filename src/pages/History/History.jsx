// src/pages/History/History.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import HistoryItem from "../../components/HistoryItem/HistoryItem";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { FolderClock } from 'lucide-react';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://backend-speech-transcriber-1.onrender.com/history");
        setHistory(res.data.data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching history:", err);
        setError("Failed to fetch transcription history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const deleteHistoryItem = async (id) => {
    try {
      await axios.delete(`https://backend-speech-transcriber-1.onrender.com/history/${id}`);
      setHistory(history.filter(item => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Failed to delete item");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        
        <h1 className="flex items-center justify-center gap-2 text-3xl font-bold text-white mb-2">
          <FolderClock className="w-7 h-7"/>Transcription History
        </h1>
        <p className="text-gray-300">
          View and manage your previous transcriptions
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {history.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎵</div>
          <p className="text-gray-400 text-lg">No transcriptions yet</p>
          <p className="text-gray-500">
            Upload or record some audio to see your history here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <HistoryItem
              key={item._id}
              item={item}
              onDelete={deleteHistoryItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default History;