import { Zap } from "lucide-react";

export function MajorAspects({ aspects }) {
  return (
    <div className="bg-gradient-to-br from-[#1E1E2E]/80 to-[#2A2A3E]/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-500/20 p-8">
      <h3 className="text-2xl font-bold text-blue-200 mb-6 flex items-center gap-2">
        <Zap size={24} className="text-blue-400" />
        Major Aspects
      </h3>
      <div className="space-y-4">
        {aspects.map((aspect, index) => (
          <div
            key={index}
            className="p-4 bg-[#0f0f1a]/40 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-bold text-blue-100 capitalize">
                  {aspect.planets[0]} {aspect.type} {aspect.planets[1]}
                </span>
                <div className="text-sm text-gray-400 mt-1">
                  {aspect.meaning}
                </div>
              </div>
              <div className="text-right">
                <div className="text-blue-300 font-mono text-sm">
                  {aspect.angle}°
                </div>
                <div className="text-xs text-gray-500">
                  Strength: {aspect.strength}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
