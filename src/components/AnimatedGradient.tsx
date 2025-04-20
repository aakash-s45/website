import React, { useEffect, useRef } from 'react';

// --- Perlin Noise Implementation ---
const permutation = [
  151, 160, 137, 91, 90, 15,
  131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30,
  69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75,
  0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
  88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74,
  165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60,
  211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65,
  25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200,
  196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64,
  52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212,
  207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213,
  119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
  129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104,
  218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241,
  81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106,
  157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205,
  93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180
];
const p: number[] = new Array(512);
for (let i = 0; i < 512; i++) {
  p[i] = permutation[i % 256];
}

const fade = (t: number): number => t * t * t * (t * (t * 6 - 15) + 10);
const lerp = (t: number, a: number, b: number): number => a + t * (b - a);
const grad = (hash: number, x: number, y: number, z: number): number => {
  const h = hash & 15;
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : (h === 12 || h === 14 ? x : z);
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
};

function perlinNoise(x: number, y: number, z: number): number {
  // Find unit cube
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  const Z = Math.floor(z) & 255;

  // Relative coords
  x -= Math.floor(x);
  y -= Math.floor(y);
  z -= Math.floor(z);

  // Fade curves
  const u = fade(x);
  const v = fade(y);
  const w = fade(z);

  // Hash coords
  const A  = p[X] + Y;
  const AA = p[A] + Z;
  const AB = p[A + 1] + Z;
  const B  = p[X + 1] + Y;
  const BA = p[B] + Z;
  const BB = p[B + 1] + Z;

  // Blend results
  const res = lerp(
    w,
    lerp(
      v,
      lerp(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)),
      lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z))
    ),
    lerp(
      v,
      lerp(u, grad(p[AA + 1], x, y, z - 1), grad(p[BA + 1], x - 1, y, z - 1)),
      lerp(u, grad(p[AB + 1], x, y - 1, z - 1), grad(p[BB + 1], x - 1, y - 1, z - 1))
    )
  );
  return res;
}

const AnimatedGradient: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let animationFrameId: number;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize logic
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // ~~~~~ Color Palette ~~~~~
    const colors = ["#B3EFB2", "#7A9E7E"];

    // Convert hex to RGBA
    const hexToRGBA = (hex: string, alpha: number): string => {
      hex = hex.replace('#', '');
      const bigint = parseInt(hex, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    // // Load noise image and create pattern
    // const noiseImage = new Image();
    // noiseImage.src = '/images/noise.png'; // adjust path if needed
    // let noisePattern: CanvasPattern | null = null;
    // noiseImage.onload = () => {
    //   if (ctx) {
    //     noisePattern = ctx.createPattern(noiseImage, 'repeat');
    //   }
    // };

    // ~~~~~ Animation Setup ~~~~~
    let time = 0;
    const speed = 0.002;      // Lower speed for more subtle motion
    const noiseScale = 0.003; // Lower frequency => smoother movement
    // const movementMultiplier = 0.15; // Amplify motion.
    const movementMultiplier = 0.15; // Amplify motion.
    const NUM_AREAS = 3;

    // Generate multiple gradient areas for a richer background
    const gradientAreas = Array.from({ length: NUM_AREAS }, (_, i) => {
      const randomColorIndex = Math.floor(Math.random() * colors.length);
      return {
        // Random positions within the canvas
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        // Radius as a fraction of canvas width
        radius: (0.5 + Math.random() * 0.3) * canvas.width,
        // Small random velocities
        vx: (Math.random() - 0.5) * movementMultiplier,
        vy: (Math.random() - 0.5) * movementMultiplier,
        colorIndex: randomColorIndex,
      };
    });

    // ~~~~~ Animation Loop ~~~~~
    const animate = () => {
      time += speed;

      // Clear with a dark background
      ctx.globalCompositeOperation = 'source-over';
      ctx.filter = 'none';

      ctx.fillStyle = 'rgba(242, 242, 234, 1)';
      // if(noisePattern)ctx.fillStyle = noisePattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Use screen blending + heavier blur for a soft glow effect
      // ctx.globalCompositeOperation = 'darken';
      // ctx.globalCompositeOperation = 'screen';
      ctx.filter = 'blur(800px)';

      // Draw each gradient area
      gradientAreas.forEach(area => {
        // Use Perlin noise to move each area
        const noiseX = perlinNoise(area.x * noiseScale, area.y * noiseScale, time);
        const noiseY = perlinNoise(area.x * noiseScale, area.y * noiseScale, time + 100);

        // Update positions
        area.x += (area.vx + noiseX * 0.7);
        area.y += (area.vy + noiseY * 0.7);

        // Smooth boundary checks
        if (area.x < -area.radius * 0.5) area.vx = Math.abs(area.vx);
        if (area.x > canvas.width + area.radius * 0.5) area.vx = -Math.abs(area.vx);
        if (area.y < -area.radius * 0.5) area.vy = Math.abs(area.vy);
        if (area.y > canvas.height + area.radius * 0.5) area.vy = -Math.abs(area.vy);

        // Create radial gradient
        const color = colors[area.colorIndex];
        const gradient = ctx.createRadialGradient(
          area.x, area.y, 0,
          area.x, area.y, area.radius
        );

        const size  = area.radius/canvas.width+0.2;
        
        // More color stops => smoother transitions
        gradient.addColorStop(0, hexToRGBA(color, size*0.75));
        gradient.addColorStop(0.3, hexToRGBA(color, size*0.6));
        gradient.addColorStop(0.6, hexToRGBA(color, size*0.25));
        gradient.addColorStop(0.7, hexToRGBA(color, size*0));

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(area.x, area.y, area.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Request next frame
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
};

export default AnimatedGradient;
