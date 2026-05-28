import { Sparkles, Copy } from "lucide-react";

export function CodexString({ codexString, onCopy }) {
  const handleCopy = () => {
    onCopy(codexString, "Codex copied!");
  };

  return (
    <div className="bg-gradient-to-br from-[#1E1E2E]/80 to-[#2A2A3E]/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-500/20 p-8">
      <h3 className="text-2xl font-bold text-orange-200 mb-4 flex items-center gap-2">
        <Sparkles size={24} className="text-orange-400" />
        Your Unique Codex String
        <Copy
          size={18}
          className="ml-auto cursor-pointer text-gray-400 hover:text-orange-300 transition-colors"
          onClick={handleCopy}
        />
      </h3>
      <div className="bg-gradient-to-r from-orange-900/20 to-yellow-900/20 rounded-xl p-6 border border-orange-500/20">
        <code className="text-lg text-orange-100 font-mono break-all block">
          {codexString}
        </code>
      </div>
      <p className="text-sm text-gray-400 mt-4">
        This encoded string contains your complete harmonic signature. Save it
        for future sessions.
      </p>
    </div>
  );
}
