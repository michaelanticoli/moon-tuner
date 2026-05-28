import { Volume2, Copy } from "lucide-react";

export function PersonalScale({ scale, mode, onCopy }) {
  const handleCopy = () => {
    const scaleText = scale
      .map((n) => `${n.name}: ${n.frequency}Hz`)
      .join(", ");
    onCopy(scaleText, "Scale copied!");
  };

  return (
    <div className="bg-gradient-to-br from-[#1E1E2E]/80 to-[#2A2A3E]/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-500/20 p-8">
      <h3 className="text-2xl font-bold text-purple-200 mb-4 flex items-center gap-2">
        <Volume2 size={24} className="text-purple-400" />
        Your Personal Scale
        <Copy
          size={18}
          className="ml-auto cursor-pointer text-gray-400 hover:text-purple-300 transition-colors"
          onClick={handleCopy}
        />
      </h3>
      <div className="mb-4 text-sm text-purple-300">
        Mode: <span className="font-semibold capitalize">{mode}</span>
      </div>
      <div className="space-y-2">
        {scale.map((note, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all"
          >
            <span className="font-bold text-purple-100">{note.name}</span>
            <span className="font-mono text-purple-300">
              {note.frequency} Hz
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
