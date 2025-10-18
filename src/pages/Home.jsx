import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-100 flex flex-col items-center justify-center text-center px-4">
      {/* Logo / App Name */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-600 mb-3">
        🚀 PitchCraft
      </h1>
      <p className="text-gray-700 text-lg md:text-xl max-w-2xl mb-8">
        Transform your startup ideas into stunning, investor-ready pitches —
        powered by <span className="text-indigo-600 font-semibold">AI</span>.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => navigate("/create")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
        >
          ⚡ Get Started
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-all"
        >
          📂 View Dashboard
        </button>
      </div>

      {/* Hero Section Image */}
      <img
        src="https://cdn3d.iconscout.com/3d/premium/thumb/artificial-intelligence-3d-icon-download-in-png-blend-fbx-gltf-file-formats--ai-brain-chip-technology-pack-science-icons-6303681.png"
        alt="AI Pitch"
        className="w-64 md:w-80 mt-10 animate-bounce-slow"
      />

      {/* Features Section */}
      <div className="max-w-5xl mt-16 grid md:grid-cols-3 gap-6 px-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-indigo-500">
          <h3 className="text-lg font-semibold text-indigo-600 mb-2">
            💡 AI-Powered Ideas
          </h3>
          <p className="text-gray-600 text-sm">
            Generate creative startup names, taglines, and pitches using Gemini AI.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-indigo-500">
          <h3 className="text-lg font-semibold text-indigo-600 mb-2">
            🎯 Instant Pitches
          </h3>
          <p className="text-gray-600 text-sm">
            Create investor-ready pitch content instantly from your idea.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-indigo-500">
          <h3 className="text-lg font-semibold text-indigo-600 mb-2">
            ☁️ Save & Export
          </h3>
          <p className="text-gray-600 text-sm">
            Save your pitches securely and export them to beautiful PDF files.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-gray-500 text-sm">
        © {new Date().getFullYear()} PitchCraft AI — Built by Nexa ⚡
      </footer>
    </div>
  );
};

export default Home;
