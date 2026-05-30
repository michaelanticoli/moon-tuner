import { Sparkles, Copy } from "lucide-react";

export function RitualScript({ ritualScript, onCopy }) {
  const handleCopy = () => {
    onCopy(ritualScript, "Ritual copied!");
  };

  return (
    <div className="bg-gradient-to-br from-[#1E1E2E]/80 to-[#2A2A3E]/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-pink-500/20 p-8">
      <h3 className="text-2xl font-bold text-pink-200 mb-4 flex items-center gap-2">
        <Sparkles size={24} className="text-pink-400" />
        Personalized Ritual Script
        <Copy
          size={18}
          className="ml-auto cursor-pointer text-gray-400 hover:text-pink-300 transition-colors"
          onClick={handleCopy}
        />
      </h3>
      <div className="bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-pink-500/10">
        <div className="prose prose-invert max-w-none">
          {ritualScript.split("\n\n").map((paragraph, index) => (
            <p
              key={index}
              className="text-gray-200 leading-relaxed mb-4 last:mb-0 text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
