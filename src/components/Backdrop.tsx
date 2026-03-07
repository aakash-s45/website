"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface BackdropProps {
  imageUrl?: string;
  targetId?: string;
}

const Backdrop = ({
  imageUrl = "/images/error-albumart.png",
  targetId = "album-art",
}: BackdropProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Multiplier: how much bigger than the widget the canvas extends
    const PAD = 9;

    // Get canvas dimensions and position based on the music widget
    const getWidgetDims = () => {
      const el = targetId ? document.getElementById(targetId) : null;
      if (!el)
        return {
          w: window.innerWidth,
          h: window.innerHeight,
          cx: window.innerWidth / 2,
          cy: window.innerHeight / 2,
        };
      const r = el.getBoundingClientRect();
      const w = r.width * PAD;
      const h = r.height * PAD;
      const cx = r.left + r.width / 2 + window.scrollX;
      const cy = r.top + r.height / 2 + window.scrollY;
      return { w, h, cx, cy };
    };

    const dims = getWidgetDims();

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, dims.w / dims.h, 0.1, 1000);
    camera.position.set(0, 25, 100);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(dims.w, dims.h, false);
    canvas.style.width = `${dims.w}px`;
    canvas.style.height = `${dims.h}px`;
    canvas.style.left = `${(dims.cx - dims.w) / 2}px`;
    canvas.style.top = `${(dims.cy - dims.h) / 2}px`;
    canvas.style.display = "block";

    // canvas.style.backgroundColor = "green";
    // canvas.style.filter = "blur(40px) contrast(1.0) saturate(4.5)";
    canvas.style.filter = "blur(40px) contrast(0.7) saturate(1.5)";

    // Mesh & material setup
    const meshInstances: THREE.Mesh[] = [];
    const geometry = new THREE.CircleGeometry(13, 64);
    const textureLoader = new THREE.TextureLoader();

    // Per-mesh animation parameters (stored alongside meshes)
    interface MeshAnimData {
      basePos: THREE.Vector3;
      orbitRadius: number;
      orbitSpeed: number;
      phaseOffset: number;
      rotSpeed: number;
      floatAmpY: number;
    }
    const meshAnimData: MeshAnimData[] = [];

    const texture = textureLoader.load(imageUrl, () => {
      const material = new THREE.MeshBasicMaterial({ map: texture });
      // Centered at origin, scaled 0.9 to keep cluster tight
      const S = 0.9;
      const meshConfig = [
        { position: new THREE.Vector3(-15 * S, -7 * S, -4 * S), rotation: 4 },
        {
          position: new THREE.Vector3((18 - 20) * S, -7 * S, -4 * S),
          rotation: -0.8,
        },
        {
          position: new THREE.Vector3((8 - 20) * S, -32 * S, -34 * S),
          rotation: 0.14,
        },
        {
          position: new THREE.Vector3(-48 * S, -82 * S, -12 * S),
          rotation: -0.2,
        },
        { position: new THREE.Vector3(-12 * S, -70 * S, 2 * S), rotation: 2.6 },
      ];

      meshConfig.forEach(({ position, rotation }, i) => {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(position);
        mesh.rotation.z = rotation;
        scene.add(mesh);
        meshInstances.push(mesh);

        // Each mesh gets unique animation params for organic feel
        meshAnimData.push({
          basePos: position.clone(),
          orbitRadius: 1.5 + Math.random() * 2.1, // gentle drift radius
          orbitSpeed: 0.12 + Math.random() * 0.15, // drift speed
          phaseOffset:
            (i / meshConfig.length) * Math.PI * 2 + Math.random() * 0.5,
          rotSpeed: 0.0002 + Math.random() * 0.001, // rotation speed
          floatAmpY: 1 + Math.random() * 1.7, // vertical float amplitude
        });
      });
    });

    // Animate
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;

      meshInstances.forEach((mesh, i) => {
        const anim = meshAnimData[i];
        if (!anim) return;

        // Floating orbit: each mesh drifts around its base position
        mesh.position.x =
          anim.basePos.x +
          Math.sin(time * anim.orbitSpeed + anim.phaseOffset) *
            anim.orbitRadius;
        mesh.position.y =
          anim.basePos.y +
          Math.cos(time * anim.orbitSpeed * 0.7 + anim.phaseOffset) *
            anim.floatAmpY;
        mesh.position.z =
          anim.basePos.z +
          Math.sin(time * anim.orbitSpeed * 0.5 + anim.phaseOffset * 1.3) * 2;

        // Subtle scale breathing
        const scalePulse = 1 + Math.sin(time * 0.3 + anim.phaseOffset) * 0.05;
        mesh.scale.set(scalePulse, scalePulse, 1);

        // Vertex warp (more pronounced at close range)
        const posAttr = mesh.geometry.attributes
          .position as THREE.BufferAttribute;
        for (let j = 0; j < posAttr.count; j++) {
          const x = posAttr.getX(j);
          const y = posAttr.getY(j);
          posAttr.setZ(
            j,
            Math.sin(x * 0.5 + time * 0.5 + anim.phaseOffset) * 6 * 1.5 +
              Math.cos(y * 0.4 + time * 0.35) * 4 * 1.5,
          );
        }
        posAttr.needsUpdate = true;

        // Smooth rotation
        mesh.rotation.z += anim.rotSpeed;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Reposition and resize canvas based on music widget
    const updateLayout = () => {
      const d = getWidgetDims();
      camera.aspect = d.w / d.h;
      camera.updateProjectionMatrix();
      renderer.setSize(d.w, d.h, false);
      canvas.style.width = `${d.w}px`;
      canvas.style.height = `${d.h}px`;
      canvas.style.left = `${d.cx - d.w / 2}px`;
      canvas.style.top = `${d.cy - d.h / 2}px`;
    };

    window.addEventListener("resize", updateLayout);
    window.addEventListener("scroll", updateLayout, { passive: true });

    // Observe the target element for layout changes
    let resizeObserver: ResizeObserver | null = null;
    const targetEl = targetId ? document.getElementById(targetId) : null;
    if (targetEl) {
      resizeObserver = new ResizeObserver(updateLayout);
      resizeObserver.observe(targetEl);
    }

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updateLayout);
      window.removeEventListener("scroll", updateLayout);
      if (resizeObserver) resizeObserver.disconnect();
      renderer.dispose();

      meshInstances.forEach((mesh) => {
        mesh.geometry.dispose();
        if (mesh.material instanceof THREE.Material) mesh.material.dispose();
      });

      texture.dispose();
      geometry.dispose();
    };
  }, [imageUrl, targetId]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
};

export default Backdrop;
