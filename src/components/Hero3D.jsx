"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";

/* =========================================================
   Shared palette — keep this in sync with AboutEcosystem3D /
   TechCore3D so the whole site reads as one connected system
   instead of every section inventing its own blue.
========================================================= */

const CYAN = "#22F3FF";
const BLUE = "#3B82F6";
const VIOLET = "#A855F7";
const WHITE = "#F8FAFC";

/* =========================================================
   Soft glow sprite — a real radial-gradient billboard that
   fades to transparent, instead of a solid sphere (which has
   a hard silhouette edge and looks like a flat disc).
========================================================= */

const glowTextureCache = new Map();

function getGlowTexture(color) {
  if (glowTextureCache.has(color)) return glowTextureCache.get(color);
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.4, color);
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  glowTextureCache.set(color, texture);
  return texture;
}

function GlowHalo({ color, size = 1, opacity = 0.5 }) {
  const texture = useMemo(
    () => (typeof document !== "undefined" ? getGlowTexture(color) : null),
    [color],
  );
  if (!texture) return null;
  return (
    <sprite scale={[size * 2.4, size * 2.4, 1]}>
      <spriteMaterial
        map={texture}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </sprite>
  );
}

/* =========================================================
   COMET NODE — an orbiting point with a fading trail, so the
   rings feel like they're carrying live data instead of being
   static wireframes
========================================================= */

function CometNode({ radius, axis = "y", color, speed = 0.6, offset = 0 }) {
  const ref = useRef();
  const trailRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + offset;
    const x = Math.cos(t) * radius;
    const z = Math.sin(t) * radius;

    if (ref.current) {
      if (axis === "y") ref.current.position.set(x, 0, z);
      if (axis === "x") ref.current.position.set(0, x, z);
      if (axis === "z") ref.current.position.set(x, z, 0);
    }
    if (trailRef.current) {
      const tt = t - 0.18;
      const tx = Math.cos(tt) * radius;
      const tz = Math.sin(tt) * radius;
      if (axis === "y") trailRef.current.position.set(tx, 0, tz);
      if (axis === "x") trailRef.current.position.set(0, tx, tz);
      if (axis === "z") trailRef.current.position.set(tx, tz, 0);
    }
  });

  return (
    <group>
      <mesh ref={trailRef}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={ref}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

/* =========================================================
   TECH ORB
========================================================= */

function TechOrb() {
  const group = useRef();
  const outerRing = useRef();
  const middleRing = useRef();
  const innerRing = useRef();
  const pulse = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;

    group.current.rotation.y += delta * 0.25;
    group.current.rotation.x += delta * 0.06;

    const targetX = state.pointer.y * 0.25;
    const targetY = state.pointer.x * 0.35;

    group.current.rotation.x +=
      (targetX - group.current.rotation.x) * delta * 0.8;
    group.current.rotation.y +=
      (targetY - group.current.rotation.y) * delta * 0.8;

    if (outerRing.current) {
      outerRing.current.rotation.z += delta * 0.25;
      outerRing.current.rotation.x += delta * 0.12;
    }
    if (middleRing.current) {
      middleRing.current.rotation.y -= delta * 0.35;
      middleRing.current.rotation.z += delta * 0.15;
    }
    if (innerRing.current) {
      innerRing.current.rotation.x += delta * 0.4;
      innerRing.current.rotation.y -= delta * 0.2;
    }
    if (pulse.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.3) * 0.04;
      pulse.current.scale.setScalar(s);
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.35}>
      <group ref={group}>
        {/* Soft bloom behind everything */}
        <GlowHalo color={CYAN} size={1.5} opacity={0.55} />
        <GlowHalo color={VIOLET} size={1.1} opacity={0.3} />

        {/* Glowing core */}
        <mesh ref={pulse}>
          <sphereGeometry args={[0.52, 64, 64]} />
          <meshStandardMaterial
            color="#061827"
            emissive={CYAN}
            emissiveIntensity={3.2}
            metalness={0.85}
            roughness={0.1}
          />
        </mesh>

        {/* Wireframe core */}
        <mesh>
          <icosahedronGeometry args={[0.72, 2]} />
          <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.5} />
        </mesh>

        {/* Bright center point */}
        <mesh>
          <sphereGeometry args={[0.14, 32, 32]} />
          <meshStandardMaterial
            color={WHITE}
            emissive={CYAN}
            emissiveIntensity={4}
            metalness={0.2}
            roughness={0.05}
          />
        </mesh>

        {/* Outer orbit */}
        <mesh ref={outerRing} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.15, 0.016, 16, 120]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.9} />
        </mesh>

        {/* Second orbit */}
        <mesh ref={middleRing} rotation={[0.8, 0.4, 0]}>
          <torusGeometry args={[0.92, 0.013, 16, 120]} />
          <meshBasicMaterial color={VIOLET} transparent opacity={0.7} />
        </mesh>

        {/* Inner orbit */}
        <mesh ref={innerRing} rotation={[1.1, 0.2, 0]}>
          <torusGeometry args={[0.72, 0.009, 16, 100]} />
          <meshBasicMaterial color={WHITE} transparent opacity={0.4} />
        </mesh>

        {/* Static orbiting nodes */}
        <mesh position={[1.15, 0, 0]}>
          <sphereGeometry args={[0.05, 20, 20]} />
          <meshBasicMaterial color={CYAN} />
        </mesh>
        <mesh position={[-1.15, 0, 0]}>
          <sphereGeometry args={[0.04, 20, 20]} />
          <meshBasicMaterial color={WHITE} />
        </mesh>
        <mesh position={[0, 1.15, 0]}>
          <sphereGeometry args={[0.045, 20, 20]} />
          <meshBasicMaterial color={BLUE} />
        </mesh>
        <mesh position={[0, -1.15, 0]}>
          <sphereGeometry args={[0.04, 20, 20]} />
          <meshBasicMaterial color={CYAN} />
        </mesh>

        {/* Live comet nodes travelling the rings — this is what
            makes the orb feel active instead of a static model */}
        <CometNode radius={1.15} axis="y" color={CYAN} speed={0.55} />
        <CometNode
          radius={0.92}
          axis="x"
          color={VIOLET}
          speed={0.7}
          offset={2}
        />

        <pointLight color={CYAN} intensity={3.5} distance={4} />
      </group>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 4]} intensity={4.5} color={CYAN} />
        <pointLight position={[-3, -2, 2]} intensity={2.4} color={VIOLET} />
        <pointLight position={[0, -3, 3]} intensity={1.6} color={BLUE} />

        <TechOrb />

        <Sparkles
          count={120}
          scale={4.2}
          size={1.8}
          speed={0.25}
          color={CYAN}
        />
        <Sparkles count={40} scale={4.2} size={2} speed={0.18} color={VIOLET} />
      </Canvas>
    </div>
  );
}
