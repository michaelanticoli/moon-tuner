export function CopyFeedback({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl animate-pulse">
      {message}
    </div>
  );
}
