import { Star } from "lucide-react";

export function PlanetaryPositions({ chartData }) {
  return (
    <div className="bg-gradient-to-br from-[#1E1E2E]/80 to-[#2A2A3E]/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-500/20 p-8">
      <h3 className="text-2xl font-bold text-emerald-200 mb-6 flex items-center gap-2">
        <Star size={24} className="text-emerald-400" />
        Your Planetary Positions
      </h3>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {Object.entries(chartData.planetaryPositions).map(([planet, data]) => (
          <div
            key={planet}
            className="flex justify-between items-center py-3 px-4 bg-[#0f0f1a]/40 rounded-xl border border-emerald-500/10 hover:border-emerald-500/30 transition-colors"
          >
            <div>
              <span className="font-bold text-emerald-100 capitalize">
                {planet.replace(/([A-Z])/g, " $1").trim()}
              </span>
              <div className="text-sm text-gray-400">{data.zodiacSign}</div>
            </div>
            <div className="text-right">
              <div className="text-emerald-300 font-mono text-sm">
                {data.frequency} Hz
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
