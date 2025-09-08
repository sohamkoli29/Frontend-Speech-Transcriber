// src/components/FileUpload/FileUpload.jsx
import { useState } from "react";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
const FileUpload = ({ setTranscription, loading, setLoading }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    setLoading(true);
    setTranscription("");

    const formData = new FormData();
    formData.append("audio", file);

    try {
      const res = await axios.post("https://backend-speech-transcriber-2.onrender.com/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTranscription(res.data.file.transcription || "Processing transcription...");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Upload Audio File</h2>
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600 file:cursor-pointer"
          />
        </div>
        
        {file && (
          <div className="text-sm text-gray-400">
            Selected: {file.name}
          </div>
        )}
        
        <button
          onClick={handleUpload}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-3 rounded-lg font-medium transition-colors"
          disabled={loading || !file}
        >
         
          {loading ? <LoadingSpinner/> : "Upload & Transcribe"}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;