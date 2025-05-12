"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface BackdropProps {
  imageUrl?: string;
  targetId?: string;
}

const Backdrop = ({
  imageUrl = "/images/albumart.jpg",
  targetId = "album-art",
}: BackdropProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 10, 70);
    camera.rotation.x = -0.15;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight, false); // Don't update style automatically
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.display = "block";
    canvas.style.filter = "blur(40px) contrast(1.0) saturate(4.5)";

    // Mesh & material setup
    const meshInstances: THREE.Mesh[] = [];
    const geometry = new THREE.CircleGeometry(25, 64);
    const textureLoader = new THREE.TextureLoader();

    // const updateMeshPositionToElement = () => {
    //   if (!targetId) return;

    //   const targetEl = document.getElementById(targetId);
    //   if (!targetEl) return;

    //   const rect = targetEl.getBoundingClientRect();
    //   const x = rect.x + rect.width / 2;
    //   const y = rect.y + rect.height / 2;

    //   console.log(rect);
    // };

    const texture = textureLoader.load(imageUrl, () => {
      const material = new THREE.MeshBasicMaterial({ map: texture });

      const meshConfig = [
        { position: new THREE.Vector3(10, 25, -20), rotation: 4 },
        { position: new THREE.Vector3(65, 25, -20), rotation: -0.8 },
        { position: new THREE.Vector3(55, 0, -50), rotation: 0.14 },
        { position: new THREE.Vector3(10, -20, 0), rotation: -0.2 },
        { position: new THREE.Vector3(45, -20, 10), rotation: 2.6 },
      ];

      meshConfig.forEach(({ position, rotation }) => {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(position);
        mesh.rotation.z = rotation;
        scene.add(mesh);
        meshInstances.push(mesh);
      });
    });

    // Animate
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;

      meshInstances.forEach((mesh) => {
        const posAttr = mesh.geometry.attributes
          .position as THREE.BufferAttribute;
        for (let i = 0; i < posAttr.count; i++) {
          const x = posAttr.getX(i);
          posAttr.setZ(i, Math.sin(x * 0.5 + time) * 8);
        }
        posAttr.needsUpdate = true;

        mesh.rotation.z += Math.random() * 0.002;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      let height = window.innerHeight;

      if (width > height) {
        height = (816 / 1440) * width;
      }

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height, false);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
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
