import type { CSSProperties } from "react";

type ImageInlayFade = "left" | "right" | "both" | "bottom" | "top-bottom";

const masks: Record<ImageInlayFade, string> = {
  left: "linear-gradient(to left, black 45%, transparent 100%)",
  right: "linear-gradient(to right, black 45%, transparent 100%)",
  both: "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)",
  bottom: "linear-gradient(to bottom, black 55%, transparent 100%)",
  "top-bottom": "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
};

interface ImageInlayProps {
  src: string;
  alt: string;
  fade?: ImageInlayFade;
  className?: string;
  style?: CSSProperties;
}

export function ImageInlay({
  src,
  alt,
  fade = "both",
  className = "",
  style = {},
}: ImageInlayProps) {
  const maskImage = masks[fade];

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        WebkitMaskImage: maskImage,
        maskImage,
        ...style,
      }}
    />
  );
}
