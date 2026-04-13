import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState, useEffect, useCallback } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  duration: number;
  length: number;
}

function PhaseMoon({ size = 80 }: { size?: number }) {
  const [phase, setPhase] = useState(0); // 0 to 1 representing full cycle
  
  useEffect(() => {
    const cycleDuration = 30000; // 30 seconds for a full cycle
    const interval = 50;
    let elapsed = 0;
    const timer = setInterval(() => {
      elapsed += interval;
      setPhase((elapsed % cycleDuration) / cycleDuration);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  // Convert phase (0-1) to illumination curve
  // 0 = new moon, 0.5 = full moon, 1 = new moon again
  const illumination = Math.sin(phase * Math.PI);
  const isWaxing = phase < 0.5;
  
  const r = size / 2;
  const curveOffset = (1 - illumination * 2) * r;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <radialGradient id="distantMoonGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="hsl(45, 15%, 92%)" />
          <stop offset="60%" stopColor="hsl(40, 12%, 82%)" />
          <stop offset="100%" stopColor="hsl(38, 10%, 72%)" />
        </radialGradient>
        <filter id="distantMoonGlow">
          <feGaussianBlur stdDeviation="4" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Lit face */}
      <circle cx={r} cy={r} r={r - 2} fill="url(#distantMoonGrad)" filter="url(#distantMoonGlow)" />
      
      {/* Crater details */}
      <circle cx={r * 0.7} cy={r * 0.75} r={r * 0.1} fill="hsl(40, 10%, 76%)" opacity="0.4" />
      <circle cx={r * 1.2} cy={r * 1.1} r={r * 0.07} fill="hsl(40, 10%, 76%)" opacity="0.3" />
      <circle cx={r * 0.9} cy={r * 0.5} r={r * 0.12} fill="hsl(40, 10%, 78%)" opacity="0.25" />
      
      {/* Shadow overlay for phase */}
      {illumination < 0.98 && (
        <path
          d={`
            M ${r} 2
            A ${r - 2} ${r - 2} 0 1 ${isWaxing ? 1 : 0} ${r} ${size - 2}
            A ${Math.abs(curveOffset)} ${r - 2} 0 0 ${curveOffset > 0 ? (isWaxing ? 0 : 1) : (isWaxing ? 1 : 0)} ${r} 2
            Z
          `}
          fill="hsl(220, 25%, 8%)"
          opacity="0.92"
        />
      )}
    </svg>
  );
}

function ShootingStarElement({ star, onComplete }: { star: ShootingStar; onComplete: () => void }) {
  const angleRad = (star.angle * Math.PI) / 180;
  const travelDistance = 600 + Math.random() * 400;
  const endX = Math.cos(angleRad) * travelDistance;
  const endY = Math.sin(angleRad) * travelDistance;
  const tailX = -Math.cos(angleRad) * star.length;
  const tailY = -Math.sin(angleRad) * star.length;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${star.startX}%`,
        top: `${star.startY}%`,
      }}
      initial={{ x: 0, y: 0, opacity: 0 }}
      animate={{
        x: endX,
        y: endY,
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: star.duration,
        ease: "easeIn",
        opacity: { times: [0, 0.05, 0.7, 1] },
      }}
      onAnimationComplete={onComplete}
    >
      <svg
        width={star.length + 10}
        height="6"
        style={{
          transform: `rotate(${star.angle}deg)`,
          transformOrigin: "right center",
        }}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={`trail-${star.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="70%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </linearGradient>
        </defs>
        <line
          x1="0"
          y1="3"
          x2={star.length}
          y2="3"
          stroke={`url(#trail-${star.id})`}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx={star.length} cy="3" r="1.5" fill="white" opacity="0.9" />
      </svg>
    </motion.div>
  );
}

export function LunarBackground() {
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

  // Shooting stars state
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [nextId, setNextId] = useState(0);

  const spawnShootingStar = useCallback(() => {
    const id = nextId;
    setNextId((prev) => prev + 1);
    const newStar: ShootingStar = {
      id,
      startX: Math.random() * 60 + 10,
      startY: Math.random() * 30 + 5,
      angle: 120 + Math.random() * 60, // Angled downward 120-180 degrees
      duration: 0.6 + Math.random() * 0.8,
      length: 60 + Math.random() * 80,
    };
    setShootingStars((prev) => [...prev, newStar]);
  }, [nextId]);

  const removeShootingStar = useCallback((id: number) => {
    setShootingStars((prev) => prev.filter((s) => s.id !== id));
  }, []);

  useEffect(() => {
    // Spawn shooting stars at random intervals (every 3-8 seconds)
    const scheduleNext = () => {
      const delay = 3000 + Math.random() * 5000;
      return setTimeout(() => {
        spawnShootingStar();
        timerRef = scheduleNext();
      }, delay);
    };
    let timerRef = scheduleNext();
    return () => clearTimeout(timerRef);
  }, [spawnShootingStar]);

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

      {/* Shooting stars */}
      <AnimatePresence>
        {shootingStars.map((star) => (
          <ShootingStarElement
            key={star.id}
            star={star}
            onComplete={() => removeShootingStar(star.id)}
          />
        ))}
      </AnimatePresence>

      {/* Distant phase-cycling moon */}
      <motion.div
        className="absolute"
        style={{
          right: "12%",
          top: "8%",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 4, delay: 1 }}
      >
        <PhaseMoon size={64} />
      </motion.div>

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

      {/* Lunar dust particles */}
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
