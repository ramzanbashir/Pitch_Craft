import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { generatePitch } from "../../config/gemini";
import Navbar from "../../components/Navbar";

const Dashboard = () => {
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [regeneratingId, setRegeneratingId] = useState(null);

  // ✅ Fetch all pitches
  const fetchPitches = async () => {
    try {
      const snapshot = await getDocs(collection(db, "pitches"));
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPitches(list);
    } catch (error) {
      console.error("Error fetching pitches:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete pitch
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this pitch?");
    if (!confirmDelete) return;
    try {
      await deleteDoc(doc(db, "pitches", id));
      setPitches(pitches.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting pitch:", error);
    }
  };

  // ✅ Regenerate pitch with AI
  const handleRegenerate = async (pitch) => {
    setRegeneratingId(pitch.id);
    try {
      const newPitch = await generatePitch(pitch.idea);

      // Update Firestore
      await updateDoc(doc(db, "pitches", pitch.id), {
        result: newPitch,
      });

      // Update local state
      setPitches((prev) =>
        prev.map((p) =>
          p.id === pitch.id ? { ...p, result: newPitch } : p
        )
      );

      alert("Pitch regenerated successfully ✅");
    } catch (error) {
      console.error("Error regenerating:", error);
      alert("Failed to regenerate pitch 😢");
    } finally {
      setRegeneratingId(null);
    }
  };

  useEffect(() => {
    fetchPitches();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-indigo-600 font-semibold text-xl">
        Loading your pitches...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
        <Navbar />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
          🧩 Your Saved Pitches
        </h1>

        {pitches.length === 0 ? (
          <p className="text-center text-gray-600">
            No pitches yet! Go to{" "}
            <span className="text-indigo-500 font-semibold">Create Pitch</span>{" "}
            page and make your first one.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {pitches.map((pitch) => (
              <div
                key={pitch.id}
                className="bg-white shadow-md rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all duration-200"
              >
                {pitch.imageURL && (
                  <img
                    src={pitch.imageURL}
                    alt="Logo"
                    className="w-20 h-20 object-cover rounded-md mb-3"
                  />
                )}
                <h2 className="text-xl font-semibold text-indigo-600 mb-2">
                  {pitch.result.startupName}
                </h2>
                <p className="text-gray-700 mb-1">
                  <strong>Tagline:</strong> {pitch.result.tagline}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Pitch:</strong> {pitch.result.pitch}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Audience:</strong> {pitch.result.targetAudience}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleRegenerate(pitch)}
                    disabled={regeneratingId === pitch.id}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm"
                  >
                    {regeneratingId === pitch.id
                      ? "Regenerating..."
                      : "♻️ Regenerate Pitch"}
                  </button>

                  <button
                    onClick={() => handleDelete(pitch.id)}
                    className="text-red-500 font-medium hover:text-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  {pitch.createdAt?.toDate
                    ? pitch.createdAt.toDate().toLocaleString()
                    : ""}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
