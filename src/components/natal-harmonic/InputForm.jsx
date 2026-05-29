import { Star, Zap, Sparkles } from "lucide-react";
import { intentions } from "./constants";

export function InputForm({
  formData,
  onInputChange,
  onGenerate,
  isGenerating,
}) {
  return (
    <div className="bg-gradient-to-br from-[#1E1E2E]/80 to-[#2A2A3E]/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-500/20 p-8 md:p-12 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Birth Date */}
        <div>
          <label className="block text-sm font-semibold text-purple-200 mb-3 flex items-center gap-2">
            <Star size={16} className="text-purple-400" />
            Birth Date
          </label>
          <input
            type="date"
            value={formData.birthDate}
            onChange={(e) => onInputChange("birthDate", e.target.value)}
            className="w-full px-5 py-4 rounded-xl border border-purple-500/30 bg-[#0f0f1a]/60 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm"
          />
        </div>

        {/* Birth Time */}
        <div>
          <label className="block text-sm font-semibold text-purple-200 mb-3 flex items-center gap-2">
            <Zap size={16} className="text-blue-400" />
            Birth Time
          </label>
          <input
            type="time"
            value={formData.birthTime}
            onChange={(e) => onInputChange("birthTime", e.target.value)}
            className="w-full px-5 py-4 rounded-xl border border-purple-500/30 bg-[#0f0f1a]/60 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Birth Location */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-purple-200 mb-3 flex items-center gap-2">
          <Sparkles size={16} className="text-teal-400" />
          Birth Location
        </label>
        <input
          type="text"
          value={formData.birthLocation}
          onChange={(e) => onInputChange("birthLocation", e.target.value)}
          placeholder="City, State/Province, Country"
          className="w-full px-5 py-4 rounded-xl border border-purple-500/30 bg-[#0f0f1a]/60 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm"
        />
      </div>

      {/* Intention Selection */}
      <div className="mb-10">
        <label className="block text-sm font-semibold text-purple-200 mb-4">
          Choose Your Intention
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {intentions.map((intention) => (
            <button
              key={intention.id}
              onClick={() => onInputChange("intention", intention.id)}
              className={`px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all transform hover:scale-105 ${
                formData.intention === intention.id
                  ? intention.activeColor + " shadow-lg"
                  : intention.color + " backdrop-blur-sm"
              }`}
            >
              <div className="text-xl mb-1">{intention.icon}</div>
              {intention.label}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        disabled={
          isGenerating ||
          !formData.birthDate ||
          !formData.birthTime ||
          !formData.birthLocation
        }
        className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 hover:from-purple-700 hover:via-blue-700 hover:to-teal-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-xl"
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-3">
            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            Calculating Cosmic Harmonics...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Sparkles size={20} />
            Generate Your Natal Harmonic
          </span>
        )}
      </button>
    </div>
  );
}
