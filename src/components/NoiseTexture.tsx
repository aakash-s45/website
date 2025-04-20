"use client";
import React, { useEffect, useRef } from "react";

const NoiseTexture: React.FC = () => {
  const textureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeTexture = () => {
      if (!textureRef.current) return;

      // Get the full document height
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight,
      );

      textureRef.current.style.height = `${docHeight}px`;
    };

    // Initial resize
    resizeTexture();

    // Resize when window size changes
    window.addEventListener("resize", resizeTexture);

    // Also resize when content changes (might affect total height)
    const resizeObserver = new ResizeObserver(resizeTexture);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("resize", resizeTexture);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={textureRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        opacity: 0.2,
        backgroundImage: "url(/images/noise.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "500px 500px",
        mixBlendMode: "multiply",
      }}
    />
  );
};

export default NoiseTexture;
