import React, { useState } from "react";
import { generatePitch } from "../../config/gemini";
import { db, auth } from "../../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { uploadToCloudinary } from "../../config/cloudinary";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";


const CreatePitch = () => {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const navigate = useNavigate();


  // ✅ Handle image upload to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    const url = await uploadToCloudinary(file);
    setImageURL(url);
  };

  // ✅ Handle pitch generation
  const handleGeneratePitch = async () => {
  if (!idea.trim()) {
    alert("Please enter your startup idea first!");
    return;
  }
  setLoading(true);
  setResult(null);
  try {
    const response = await generatePitch(idea);
    setResult(response);

    // ✅ Save to Firebase Firestore
    const user = auth.currentUser;
    if (user) {
      await addDoc(collection(db, "pitches"), {
        userId: user.uid,
        idea,
        result: response,
        imageURL,
        createdAt: Timestamp.now(),
      });
    }

    // ✅ Navigate to Export Page with Pitch Data
    navigate("/export", { state: { pitch: response } });

  } catch (error) {
    console.error("AI Error:", error);
    alert("Failed to generate pitch. Try again!");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <Navbar />
        <h1 className="text-2xl font-bold text-center mb-6 text-indigo-600">
          🎯 Create Your AI Startup Pitch
        </h1>

        {/* Input Area */}
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows="4"
          placeholder="Describe your startup idea... (e.g. An app that connects students with mentors)"
        />

        {/* Image Upload */}
        <div className="mt-4">
          <label className="block text-gray-600 mb-2 font-medium">
            Upload Logo (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer"
          />
          {imageURL && (
            <img
              src={imageURL}
              alt="uploaded"
              className="mt-3 w-32 h-32 object-cover rounded-lg shadow-sm"
            />
          )}
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGeneratePitch}
          disabled={loading}
          className="mt-6 w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-all"
        >
          {loading ? "Generating..." : "⚡ Generate Pitch"}
        </button>

        {/* Result Display */}
        {result && (
          <div className="mt-8 p-5 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">
              ✨ AI Generated Pitch
            </h2>
            <p><strong>Startup Name:</strong> {result.startupName}</p>
            <p><strong>Tagline:</strong> {result.tagline}</p>
            <p><strong>Pitch:</strong> {result.pitch}</p>
            <p><strong>Target Audience:</strong> {result.targetAudience}</p>
            <p><strong>Color Palette Idea:</strong> {result.colorPaletteIdea}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePitch;
