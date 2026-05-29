import { Sparkles, Info } from "lucide-react";

export function Header({ showTechInfo, onToggleTechInfo }) {
  return (
    <div className="text-center mb-12 md:mb-16">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img
          src="https://ucarecdn.com/aef3e4e8-130d-4ec1-9169-70b6fe825bb5/-/format/auto/"
          alt="Quantumelodic"
          className="w-32 h-32 md:w-40 md:h-40 object-contain animate-pulse"
          style={{ animationDuration: "4s" }}
        />
      </div>

      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 px-4 py-2 rounded-full text-sm font-medium text-purple-200 mb-6 backdrop-blur-sm">
        <Sparkles size={16} />
        Prototype v0.2 · Swiss Ephemeris Engine
      </div>

      <h1
        className="text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.05] font-bold bg-gradient-to-r from-purple-200 via-blue-200 to-teal-200 bg-clip-text text-transparent mb-6"
        style={{
          fontFamily: "Plus Jakarta Sans, sans-serif",
          letterSpacing: "-1px",
        }}
      >
        Natal Harmonic
        <br />
        Generator
      </h1>
      <p
        className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
      >
        Transform your astrological blueprint into personalized harmonic
        frequencies, sacred scales, and immersive sound rituals
      </p>

      {/* Technology Info Toggle */}
      <button
        onClick={onToggleTechInfo}
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 hover:from-indigo-600/50 hover:to-purple-600/50 border border-indigo-400/40 rounded-full text-sm font-medium text-indigo-200 transition-all backdrop-blur-sm"
      >
        <Info size={16} />
        {showTechInfo ? "Hide" : "Discover the Technology Behind This"}
      </button>
    </div>
  );
}
