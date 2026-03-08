"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Configuration types
// ---------------------------------------------------------------------------

interface MeshConfig {
  /** X offset from element center (fraction of element min dimension) */
  offsetX: number;
  /** Y offset from element center (fraction; positive = up on screen) */
  offsetY: number;
  /** Z depth in world units (negative = further from camera) */
  depth: number;
  /** Mesh radius as fraction of element min dimension */
  scale: number;
  /** Initial Z rotation (radians) */
  rotation: number;
  /** Orbit drift radius (fraction of element min dimension) */
  orbitRadius: number;
  /** Orbit angular speed (rad/s) */
  orbitSpeed: number;
  /** Self-rotation speed (rad/frame) */
  rotSpeed: number;
  /** Vertical float amplitude (fraction of element min dimension) */
  floatAmpY: number;
}

export interface AnchorGroup {
  targetId: string;
  meshConfigs: MeshConfig[];
}

// ---------------------------------------------------------------------------
// Default anchor configuration – tweak these numbers freely
// ---------------------------------------------------------------------------

const DEFAULT_ANCHORS: AnchorGroup[] = [
  {
    targetId: "album-art",
    meshConfigs: [
      {
        offsetX: -0.5,
        offsetY: 0.2,
        depth: -4,
        scale: 0.85,
        rotation: 4,
        orbitRadius: 0.1,
        orbitSpeed: 0.14,
        rotSpeed: 0.0004,
        floatAmpY: 0.08,
      },
      {
        offsetX: 0.8,
        offsetY: 0,
        depth: -4,
        scale: 0.85,
        rotation: -0.8,
        orbitRadius: 0.12,
        orbitSpeed: 0.18,
        rotSpeed: 0.0006,
        floatAmpY: 0.1,
      },
      {
        offsetX: -0.1,
        offsetY: -0.7,
        depth: -30,
        scale: 0.75,
        rotation: 0.14,
        orbitRadius: 0.15,
        orbitSpeed: 0.12,
        rotSpeed: 0.0003,
        floatAmpY: 0.12,
      },
    ],
  },
  {
    targetId: "project-grid",
    meshConfigs: [
      {
        offsetX: -0.7,
        offsetY: 0.2,
        depth: -12,
        scale: 0.35,
        rotation: -0.2,
        orbitRadius: 0.06,
        orbitSpeed: 0.15,
        rotSpeed: 0.0005,
        floatAmpY: 0.07,
      },
      {
        offsetX: 0.3,
        offsetY: -0.1,
        depth: 2,
        scale: 0.4,
        rotation: 2.6,
        orbitRadius: 0.05,
        orbitSpeed: 0.2,
        rotSpeed: 0.0007,
        floatAmpY: 0.06,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CAMERA_Z = 100;
const CAMERA_FOV = 65;
const GEO_SEGMENTS = 64;
const ORIG_RADIUS = 13; // original geometry radius – used to preserve warp ratios

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface BackdropProps {
  imageUrl?: string;
  anchors?: AnchorGroup[];
}

const Backdrop = ({
  imageUrl = "/images/error-albumart.png",
  anchors = DEFAULT_ANCHORS,
}: BackdropProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ---- Scene & camera ----
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      CAMERA_FOV,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0, CAMERA_Z);
    camera.lookAt(0, 0, 0);

    // ---- Renderer ----
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight, false);

    canvas.style.filter = "blur(40px) contrast(0.7) saturate(1.8)";

    // ---- Coordinate helpers ----

    const getPixelToWorld = () => {
      const halfFov = THREE.MathUtils.degToRad(camera.fov / 2);
      return (2 * CAMERA_Z * Math.tan(halfFov)) / window.innerHeight;
    };

    const rectToWorld = (rect: DOMRect, p2w: number): [number, number] => {
      const cx = rect.left + rect.width / 2 - window.innerWidth / 2;
      const cy = -(rect.top + rect.height / 2 - window.innerHeight / 2);
      return [cx * p2w, cy * p2w];
    };

    // ---- Build meshes on texture load ----

    interface RuntimeMesh {
      mesh: THREE.Mesh;
      geo: THREE.CircleGeometry;
      cfg: MeshConfig;
      groupIdx: number;
      phase: number;
    }

    const runtimeMeshes: RuntimeMesh[] = [];

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(imageUrl, () => {
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const total = anchors.reduce((s, g) => s + g.meshConfigs.length, 0);
      let idx = 0;

      anchors.forEach((group, gi) => {
        group.meshConfigs.forEach((cfg) => {
          const geo = new THREE.CircleGeometry(1, GEO_SEGMENTS);
          const mesh = new THREE.Mesh(geo, material);
          mesh.rotation.z = cfg.rotation;
          mesh.visible = false;
          scene.add(mesh);

          runtimeMeshes.push({
            mesh,
            geo,
            cfg,
            groupIdx: gi,
            phase: (idx / total) * Math.PI * 2 + Math.random() * 0.5,
          });
          idx++;
        });
      });
    });

    // ---- Animation loop ----

    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = performance.now() * 0.001;
      const p2w = getPixelToWorld();

      for (let i = 0; i < runtimeMeshes.length; i++) {
        const rm = runtimeMeshes[i];
        const el = document.getElementById(anchors[rm.groupIdx].targetId);

        if (!el) {
          rm.mesh.visible = false;
          continue;
        }

        rm.mesh.visible = true;

        const rect = el.getBoundingClientRect();
        const [wx, wy] = rectToWorld(rect, p2w);
        const elSize = Math.min(rect.width, rect.height) * p2w;
        const { cfg, phase } = rm;

        // --- Position: element center + config offset + orbit drift ---
        const baseX = wx + cfg.offsetX * elSize;
        const baseY = wy + cfg.offsetY * elSize;

        const driftX =
          Math.sin(t * cfg.orbitSpeed + phase) * cfg.orbitRadius * elSize;
        const driftY =
          Math.cos(t * cfg.orbitSpeed * 0.7 + phase) * cfg.floatAmpY * elSize;
        const driftZ = Math.sin(t * cfg.orbitSpeed * 0.5 + phase * 1.3) * 2;

        rm.mesh.position.set(
          baseX + driftX,
          baseY + driftY,
          cfg.depth + driftZ,
        );

        // --- Scale: proportional to element, with subtle breathing ---
        const meshScale = elSize * cfg.scale;
        const pulse = 1 + Math.sin(t * 0.3 + phase) * 0.05;
        rm.mesh.scale.set(meshScale * pulse, meshScale * pulse, 1);

        // --- Vertex warp (flag flutter) ---
        const warpFactor = meshScale / ORIG_RADIUS;
        const posAttr = rm.geo.attributes.position as THREE.BufferAttribute;
        for (let j = 0; j < posAttr.count; j++) {
          const vx = posAttr.getX(j);
          const vy = posAttr.getY(j);
          posAttr.setZ(
            j,
            (Math.sin(vx * 6.5 + t * 0.5 + phase) * 9 +
              Math.cos(vy * 5.2 + t * 0.35) * 6) *
              warpFactor,
          );
        }
        posAttr.needsUpdate = true;

        // --- Self-rotation ---
        rm.mesh.rotation.z += cfg.rotSpeed;
      }

      renderer.render(scene, camera);
    };

    animate();

    // ---- Resize handler (scroll is handled implicitly by rAF) ----

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight, false);
    };

    window.addEventListener("resize", onResize);

    // ---- Cleanup ----

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();

      runtimeMeshes.forEach((rm) => {
        rm.geo.dispose();
        if (rm.mesh.material instanceof THREE.Material)
          rm.mesh.material.dispose();
      });
      texture.dispose();
    };
  }, [imageUrl, anchors]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
};

export default Backdrop;
