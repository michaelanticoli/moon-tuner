import { Play, Pause } from "lucide-react";

export function AudioPlayer({
  rootFrequency,
  companionFrequency,
  companionFrequency2,
  isPlaying,
  onTogglePlayback,
}) {
  return (
    <div className="bg-gradient-to-br from-[#1E1E2E]/80 to-[#2A2A3E]/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-teal-500/20 p-8">
      <h3 className="text-2xl font-bold text-teal-200 mb-6 flex items-center gap-2">
        <Play size={24} className="text-teal-400" />
        Harmonic Drone Engine
      </h3>

      {/* Frequency Display */}
      <div className="mb-8 space-y-3">
        <div className="flex justify-between items-center p-3 bg-teal-900/20 rounded-lg">
          <span className="text-sm text-gray-400">Root Frequency</span>
          <span className="text-teal-300 font-mono font-bold">
            {rootFrequency} Hz
          </span>
        </div>
        <div className="flex justify-between items-center p-3 bg-blue-900/20 rounded-lg">
          <span className="text-sm text-gray-400">Companion 1</span>
          <span className="text-blue-300 font-mono font-bold">
            {companionFrequency} Hz
          </span>
        </div>
        {companionFrequency2 && (
          <div className="flex justify-between items-center p-3 bg-purple-900/20 rounded-lg">
            <span className="text-sm text-gray-400">Companion 2</span>
            <span className="text-purple-300 font-mono font-bold">
              {companionFrequency2} Hz
            </span>
          </div>
        )}
      </div>

      {/* Visualization */}
      <div className="mb-6 h-32 rounded-xl overflow-hidden relative">
        <img
          src="https://raw.createusercontent.com/710a299d-73a9-46b4-95d7-22020818d292/"
          alt="Harmonic visualization"
          className="w-full h-full object-cover opacity-60"
        />
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Play Button */}
      <button
        onClick={onTogglePlayback}
        className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-xl"
      >
        {isPlaying ? (
          <>
            <Pause size={24} />
            Stop Harmonic Drone
          </>
        ) : (
          <>
            <Play size={24} />
            Play Multi-Layer Drone
          </>
        )}
      </button>
      <p className="text-center text-sm text-gray-400 mt-3">
        {isPlaying
          ? "5+ layered frequencies with reverb"
          : "Root + companions + harmonics + sub-bass"}
      </p>
    </div>
  );
}
