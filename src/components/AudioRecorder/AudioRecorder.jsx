// src/components/AudioRecorder/AudioRecorder.jsx
import { useState, useRef } from "react";
import axios from "axios";
import { Mic,CirclePause } from 'lucide-react';


const AudioRecorder = ({ setTranscription, loading, setLoading }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunks.current.push(e.data);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        const audioFile = new File([audioBlob], "recording.wav", { 
          type: "audio/wav" 
        });

        // Clear chunks for next recording
        audioChunks.current = [];

        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());

        // Upload recorded audio
        await uploadRecording(audioFile);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access denied:", err);
      alert("Microphone access denied. Please allow microphone access to record audio.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  const uploadRecording = async (audioFile) => {
    setLoading(true);
    setTranscription("");

    const formData = new FormData();
    formData.append("audio", audioFile);

    try {
      const res = await axios.post("https://backend-speech-transcriber-3.onrender.com/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTranscription(res.data.file.transcription || "Processing transcription...");
    } catch (err) {
      console.error("Recording upload error:", err);
      alert("Recording upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Record Audio</h2>
      </div>
      
      <div className="text-center space-y-4">
        {!isRecording ? (
          <button
                onClick={startRecording}
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-3 rounded-lg font-medium transition-colors"
                disabled={loading}
                                    >
                  Start Recording
                <Mic className="w-5 h-5" />
          </button>

        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
              <span className="text-cyan-400 font-medium">Recording in progress...</span>
            </div>
           <button
  onClick={stopRecording}
  className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-3 rounded-lg font-medium transition-colors"
  disabled={loading}
>
  Stop Recording
  <CirclePause className="w-5 h-5" />
      </button>
          </div>
        )}
        
        <p className="text-sm text-gray-400">
          Click to record your voice and get instant transcription
        </p>
      </div>
    </div>
  );
};

export default AudioRecorder;