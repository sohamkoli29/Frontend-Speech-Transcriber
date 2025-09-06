// src/pages/Home/Home.jsx
import { useState } from "react";
import FileUpload from "../../components/FileUpload/FileUpload";
import AudioRecorder from "../../components/AudioRecorder/AudioRecorder";
import TranscriptionResult from "../../components/TranscriptionResult/TranscriptionResult";

const Home = () => {
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto space-y-8">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-white mb-2">
          🎤 Speech Transcriber
        </h1>
        <p className="text-gray-300">
          Upload an audio file or record directly to get transcription
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileUpload 
          setTranscription={setTranscription}
          loading={loading}
          setLoading={setLoading}
        />
        <AudioRecorder 
          setTranscription={setTranscription}
          loading={loading}
          setLoading={setLoading}
        />
      </div>

      <TranscriptionResult 
        transcription={transcription}
        loading={loading}
      />
    </div>
  );
};

export default Home;