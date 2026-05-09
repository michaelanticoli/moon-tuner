import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? Math.min(100, (scrollTop / scrollHeight) * 100) : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[2px] pointer-events-none"
      style={{ background: "hsl(22 12% 14%)" }}
    >
      <div
        className="h-full transition-[width] duration-100"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, hsl(38 90% 58% / 0.7), hsl(38 90% 72% / 0.9))",
        }}
      />
    </div>
  );
}
