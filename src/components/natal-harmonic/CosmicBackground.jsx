export function CosmicBackground() {
  return (
    <>
      {/* Cosmic background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://raw.createusercontent.com/9d5b8ea5-d190-4f47-ade6-72878366d755/')`,
          opacity: 0.4,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0F] via-[#1a1a2e] to-[#16213e]" />

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.6 + 0.2})`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `pulse ${Math.random() * 3 + 2}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
