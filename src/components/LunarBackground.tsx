import { motion } from "framer-motion";
import { useMemo } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

export function LunarBackground() {
  // Generate random stars
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Drifting stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-lunar-ivory"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
            scale: [0.8, 1.2, 0.8],
            y: [0, -20, 0],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Slow-moving moon orb */}
      <motion.div
        className="absolute w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, hsl(var(--lunar-ivory)) 0%, hsl(var(--lunar-ivory) / 0.3) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
        initial={{ x: "80vw", y: "10vh", opacity: 0 }}
        animate={{
          x: ["80vw", "60vw", "40vw", "20vw"],
          y: ["10vh", "15vh", "12vh", "8vh"],
          opacity: [0, 0.15, 0.2, 0.1],
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />

      {/* Secondary subtle glow */}
      <motion.div
        className="absolute w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--accent) / 0.1) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
        initial={{ x: "20vw", y: "60vh" }}
        animate={{
          x: ["20vw", "30vw", "25vw"],
          y: ["60vh", "50vh", "65vh"],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Lunar dust particles - very subtle */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute w-1 h-1 rounded-full bg-accent/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100],
            x: [0, Math.random() * 50 - 25],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 8,
            delay: Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
