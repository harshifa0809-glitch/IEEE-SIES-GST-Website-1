"use client";

import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshTransmissionMaterial,
  Sparkles,
  Torus,
  Line,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";

/* =========================================================
   COLORS — pushed brighter + one extra accent (magenta) so the
   scene reads as "alive" rather than a single cyan wash
========================================================= */

const CYAN = "#22F3FF";
const BLUE = "#3B82F6";
const VIOLET = "#A855F7";
const MAGENTA = "#FF3DAD";
const WHITE = "#F8FAFC";

const NODES = {
  cs: {
    color: CYAN,
    label: "Computer Society",
    sub: "COMPUTING // AI // SOFTWARE",
  },
  mtt: {
    color: MAGENTA,
    label: "MTT-S",
    sub: "RF // MICROWAVE // COMMUNICATION",
  },
  wie: {
    color: VIOLET,
    label: "Women in Engineering",
    sub: "INCLUSION // LEADERSHIP // IMPACT",
  },
};

/* =========================================================
   GLOW HALO — a real soft radial-gradient sprite (always faces
   the camera) that fades to fully transparent at the edge.
   A solid sphere has a hard silhouette edge; this doesn't.
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

function GlowHalo({ color, size = 1, opacity = 0.6 }) {
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
   CENTRAL IEEE CORE
========================================================= */

function CentralCore() {
  const core = useRef();
  const ringA = useRef();
  const ringB = useRef();
  const ringC = useRef();
  const pulse = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (core.current) {
      core.current.rotation.y = t * 0.16;
      core.current.rotation.x = Math.sin(t * 0.55) * 0.05;
    }
    if (ringA.current) {
      ringA.current.rotation.z = t * 0.42;
      ringA.current.rotation.y = t * 0.2;
    }
    if (ringB.current) {
      ringB.current.rotation.x = t * 0.34;
      ringB.current.rotation.z = -t * 0.24;
    }
    if (ringC.current) {
      ringC.current.rotation.y = -t * 0.38;
      ringC.current.rotation.x = t * 0.14;
    }
    if (pulse.current) {
      const s = 1 + Math.sin(t * 1.4) * 0.035;
      pulse.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={core} scale={0.9}>
      {/* Outer glow bloom */}
      <GlowHalo color={CYAN} size={1.5} opacity={0.5} />
      <GlowHalo color={BLUE} size={1.15} opacity={0.4} />

      {/* Energy shell */}
      <mesh>
        <sphereGeometry args={[1.16, 64, 64]} />
        <meshBasicMaterial
          color={CYAN}
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Glass outer sphere */}
      <mesh>
        <sphereGeometry args={[1.02, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.35}
          transmission={0.95}
          roughness={0.04}
          chromaticAberration={0.07}
          anisotropy={0.35}
          distortion={0.08}
          distortionScale={0.15}
          temporalDistortion={0.05}
          color={CYAN}
        />
      </mesh>

      {/* Inner dimensional sphere */}
      <mesh ref={pulse} castShadow receiveShadow>
        <sphereGeometry args={[0.78, 64, 64]} />
        <meshPhysicalMaterial
          color="#0A2038"
          metalness={0.7}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.06}
          emissive={BLUE}
          emissiveIntensity={0.7}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Inner energy */}
      <mesh>
        <sphereGeometry args={[0.47, 48, 48]} />
        <meshPhysicalMaterial
          color={BLUE}
          metalness={0.4}
          roughness={0.08}
          clearcoat={1}
          emissive={CYAN}
          emissiveIntensity={2.6}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Bright center */}
      <mesh>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial
          color={WHITE}
          emissive={CYAN}
          emissiveIntensity={4.5}
          metalness={0.2}
          roughness={0.05}
        />
      </mesh>

      {/* Orbit rings */}
      <group ref={ringA}>
        <Torus
          args={[1.02, 0.02, 16, 128]}
          rotation={[Math.PI * 0.43, 0.18, 0.12]}
        >
          <meshBasicMaterial color={CYAN} transparent opacity={0.95} />
        </Torus>
      </group>
      <group ref={ringB}>
        <Torus args={[1.1, 0.014, 16, 128]} rotation={[0.72, 0.42, 0.48]}>
          <meshBasicMaterial color={MAGENTA} transparent opacity={0.7} />
        </Torus>
      </group>
      <group ref={ringC}>
        <Torus args={[0.94, 0.012, 16, 128]} rotation={[1.18, -0.25, 0.62]}>
          <meshBasicMaterial color={VIOLET} transparent opacity={0.6} />
        </Torus>
      </group>

      <mesh position={[0.94, 0.22, 0.16]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color={CYAN} />
      </mesh>
      <mesh position={[-0.82, 0.36, 0.15]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color={MAGENTA} />
      </mesh>

      <pointLight color={CYAN} intensity={5} distance={5} />
    </group>
  );
}

/* =========================================================
   COMPUTER SOCIETY — PROCESSOR
========================================================= */

function ComputerChip() {
  const group = useRef();
  const pins = useMemo(() => [-2, -1, 0, 1, 2].map((n) => n * 0.15), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (!group.current) return;
    group.current.rotation.y = Math.sin(t * 0.65) * 0.16;
    group.current.rotation.x = Math.sin(t * 0.42) * 0.06;
  });

  return (
    <group ref={group} scale={0.75} rotation={[0.04, -0.18, 0.02]}>
      <GlowHalo color={CYAN} size={0.85} opacity={0.55} />

      <mesh position={[0, -0.19, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.25, 0.12, 1.08]} />
        <meshPhysicalMaterial
          color="#050B13"
          metalness={0.95}
          roughness={0.18}
          clearcoat={1}
        />
      </mesh>
      <mesh position={[0, -0.08, 0]} castShadow>
        <boxGeometry args={[1.17, 0.15, 1.0]} />
        <meshPhysicalMaterial
          color="#0A1422"
          metalness={0.9}
          roughness={0.16}
          emissive={BLUE}
          emissiveIntensity={0.18}
        />
      </mesh>
      <mesh position={[0, 0.04, 0]} castShadow>
        <boxGeometry args={[1.08, 0.1, 0.92]} />
        <meshPhysicalMaterial
          color="#0B1A29"
          metalness={0.88}
          roughness={0.15}
          clearcoat={1}
          emissive={CYAN}
          emissiveIntensity={0.16}
        />
      </mesh>
      <mesh position={[0, 0.18, 0]} castShadow>
        <boxGeometry args={[0.76, 0.25, 0.68]} />
        <meshPhysicalMaterial
          color="#111B2A"
          metalness={0.92}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.06}
        />
      </mesh>
      <mesh position={[0, 0.33, 0]}>
        <boxGeometry args={[0.54, 0.07, 0.48]} />
        <meshPhysicalMaterial
          color="#091421"
          metalness={0.84}
          roughness={0.08}
          clearcoat={1}
          emissive={BLUE}
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0, 0.375, 0]}>
        <boxGeometry args={[0.2, 0.045, 0.18]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN}
          emissiveIntensity={3.2}
          metalness={0.3}
          roughness={0.05}
        />
      </mesh>

      {pins.map((x, i) => (
        <mesh key={`front-${i}`} position={[x, 0.12, 0.57]}>
          <boxGeometry args={[0.035, 0.08, 0.18]} />
          <meshStandardMaterial
            color={CYAN}
            emissive={CYAN}
            emissiveIntensity={1.4}
            metalness={0.8}
            roughness={0.14}
          />
        </mesh>
      ))}
      {pins.map((x, i) => (
        <mesh key={`back-${i}`} position={[x, 0.12, -0.57]}>
          <boxGeometry args={[0.035, 0.08, 0.18]} />
          <meshStandardMaterial
            color={CYAN}
            emissive={CYAN}
            emissiveIntensity={1.4}
            metalness={0.8}
            roughness={0.14}
          />
        </mesh>
      ))}
      {pins.map((z, i) => (
        <mesh key={`left-${i}`} position={[-0.62, 0.12, z]}>
          <boxGeometry args={[0.18, 0.08, 0.035]} />
          <meshStandardMaterial
            color={BLUE}
            emissive={BLUE}
            emissiveIntensity={1.4}
            metalness={0.8}
            roughness={0.14}
          />
        </mesh>
      ))}
      {pins.map((z, i) => (
        <mesh key={`right-${i}`} position={[0.62, 0.12, z]}>
          <boxGeometry args={[0.18, 0.08, 0.035]} />
          <meshStandardMaterial
            color={BLUE}
            emissive={BLUE}
            emissiveIntensity={1.4}
            metalness={0.8}
            roughness={0.14}
          />
        </mesh>
      ))}

      <mesh position={[0.37, 0.24, 0.27]}>
        <sphereGeometry args={[0.028, 16, 16]} />
        <meshBasicMaterial color={CYAN} />
      </mesh>
      <mesh position={[-0.37, 0.24, -0.27]}>
        <sphereGeometry args={[0.028, 16, 16]} />
        <meshBasicMaterial color={BLUE} />
      </mesh>

      <pointLight color={CYAN} intensity={2.2} distance={2.6} />
    </group>
  );
}

/* =========================================================
   MTT-S — RF STRUCTURE
========================================================= */

function MTTSObject() {
  const group = useRef();
  const ringA = useRef();
  const ringB = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (group.current) group.current.rotation.y = Math.sin(t * 0.55) * 0.14;
    if (ringA.current) ringA.current.rotation.z = t * 0.44;
    if (ringB.current) ringB.current.rotation.x = t * 0.3;
  });

  return (
    <group ref={group} scale={0.72} rotation={[0.02, 0.15, -0.02]}>
      <GlowHalo color={MAGENTA} size={0.78} opacity={0.55} />

      <mesh position={[0, -0.47, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.58, 0.66, 0.16, 48]} />
        <meshPhysicalMaterial
          color="#080E19"
          metalness={0.97}
          roughness={0.15}
          clearcoat={1}
        />
      </mesh>
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.48, 0.55, 0.08, 48]} />
        <meshPhysicalMaterial
          color="#181322"
          metalness={0.9}
          roughness={0.14}
          emissive={MAGENTA}
          emissiveIntensity={0.18}
        />
      </mesh>
      <Torus args={[0.52, 0.016, 14, 96]} position={[0, -0.29, 0]}>
        <meshBasicMaterial color={MAGENTA} transparent opacity={0.95} />
      </Torus>

      <mesh castShadow>
        <sphereGeometry args={[0.3, 48, 48]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.3}
          transmission={0.93}
          roughness={0.045}
          chromaticAberration={0.1}
          anisotropy={0.3}
          color={MAGENTA}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.145, 32, 32]} />
        <meshStandardMaterial
          color={MAGENTA}
          emissive={MAGENTA}
          emissiveIntensity={3}
          metalness={0.35}
          roughness={0.06}
        />
      </mesh>

      <group ref={ringA}>
        <Torus args={[0.5, 0.018, 14, 96]} rotation={[Math.PI / 2, 0.18, 0]}>
          <meshBasicMaterial color={MAGENTA} transparent opacity={0.9} />
        </Torus>
      </group>
      <group ref={ringB}>
        <Torus args={[0.62, 0.013, 14, 96]} rotation={[0.9, 0.35, 0.18]}>
          <meshBasicMaterial color={CYAN} transparent opacity={0.55} />
        </Torus>
      </group>

      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.075, 0.11, 0.11, 24]} />
        <meshPhysicalMaterial
          color="#1B2638"
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[0, 0.67, 0]}>
        <cylinderGeometry args={[0.022, 0.035, 0.72, 20]} />
        <meshPhysicalMaterial
          color="#C7D2E0"
          metalness={0.98}
          roughness={0.1}
          emissive={MAGENTA}
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0, 1.05, 0]}>
        <sphereGeometry args={[0.048, 18, 18]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN}
          emissiveIntensity={3}
        />
      </mesh>

      <pointLight color={MAGENTA} intensity={2.6} distance={3} />
    </group>
  );
}

/* =========================================================
   WOMEN IN ENGINEERING — CRYSTAL
========================================================= */

function WIEObject() {
  const group = useRef();
  const ringA = useRef();
  const ringB = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.55) * 0.14;
      group.current.rotation.z = Math.sin(t * 0.35) * 0.045;
    }
    if (ringA.current) ringA.current.rotation.z = t * 0.3;
    if (ringB.current) ringB.current.rotation.x = -t * 0.32;
  });

  return (
    <group ref={group} scale={0.76} rotation={[0.08, -0.12, 0]}>
      <GlowHalo color={VIOLET} size={0.85} opacity={0.55} />

      <mesh position={[0, -0.47, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.56, 0.63, 0.16, 48]} />
        <meshPhysicalMaterial
          color="#080E19"
          metalness={0.97}
          roughness={0.14}
          clearcoat={1}
        />
      </mesh>
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.47, 0.54, 0.08, 48]} />
        <meshPhysicalMaterial
          color="#1D1730"
          metalness={0.9}
          roughness={0.13}
          emissive={VIOLET}
          emissiveIntensity={0.18}
        />
      </mesh>
      <Torus args={[0.51, 0.016, 14, 96]} position={[0, -0.29, 0]}>
        <meshBasicMaterial color={VIOLET} transparent opacity={0.9} />
      </Torus>

      <mesh castShadow receiveShadow rotation={[0.12, 0.35, 0.08]}>
        <octahedronGeometry args={[0.56, 2]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.36}
          transmission={0.92}
          roughness={0.04}
          chromaticAberration={0.1}
          anisotropy={0.35}
          distortion={0.045}
          distortionScale={0.08}
          color={VIOLET}
        />
      </mesh>
      <mesh rotation={[0.12, 0.35, 0.08]} scale={0.48}>
        <octahedronGeometry args={[0.56, 1]} />
        <meshPhysicalMaterial
          color="#22124A"
          metalness={0.45}
          roughness={0.1}
          clearcoat={1}
          emissive={VIOLET}
          emissiveIntensity={1.4}
          transparent
          opacity={0.78}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.12, 28, 28]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN}
          emissiveIntensity={3.2}
          metalness={0.25}
          roughness={0.05}
        />
      </mesh>

      <group ref={ringA}>
        <Torus args={[0.69, 0.016, 14, 96]} rotation={[Math.PI / 2, 0.2, 0]}>
          <meshBasicMaterial color={VIOLET} transparent opacity={0.85} />
        </Torus>
      </group>
      <group ref={ringB}>
        <Torus args={[0.61, 0.012, 14, 96]} rotation={[0.76, 0.3, 0.52]}>
          <meshBasicMaterial color={CYAN} transparent opacity={0.5} />
        </Torus>
      </group>

      <pointLight color={VIOLET} intensity={2.6} distance={3} />
    </group>
  );
}

/* =========================================================
   NETWORK CONNECTIONS — brighter + slow "breathing" opacity
========================================================= */

function NetworkConnections() {
  const a = useRef();
  const b = useRef();
  const c = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const pulse = (phase) => 0.45 + Math.sin(t * 1.2 + phase) * 0.25;
    if (a.current) a.current.material.opacity = pulse(0);
    if (b.current) b.current.material.opacity = pulse(2);
    if (c.current) c.current.material.opacity = pulse(4);
  });

  return (
    <group>
      <Line
        ref={a}
        points={[
          [-1.85, 0.72, 0.08],
          [-1.4, 0.56, 0.08],
          [-1.0, 0.36, 0.1],
          [-0.58, 0.18, 0.12],
          [0, 0, 0.04],
        ]}
        color={CYAN}
        transparent
        opacity={0.6}
        lineWidth={1.6}
      />
      <Line
        ref={b}
        points={[
          [-1.85, -0.72, -0.05],
          [-1.4, -0.55, -0.03],
          [-1.0, -0.38, 0],
          [-0.58, -0.19, 0.05],
          [0, 0, 0.04],
        ]}
        color={MAGENTA}
        transparent
        opacity={0.6}
        lineWidth={1.6}
      />
      <Line
        ref={c}
        points={[
          [1.85, 0, 0.1],
          [1.4, 0, 0.09],
          [1.0, 0, 0.08],
          [0.58, 0, 0.06],
          [0, 0, 0.04],
        ]}
        color={VIOLET}
        transparent
        opacity={0.6}
        lineWidth={1.6}
      />
    </group>
  );
}

/* =========================================================
   MOVING PARTICLES ON CONNECTIONS
========================================================= */

function MovingParticle({ start, end, color, speed = 0.4 }) {
  const ref = useRef();
  const trail = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const progress = (clock.elapsedTime * speed) % 1;
    ref.current.position.lerpVectors(
      new THREE.Vector3(...start),
      new THREE.Vector3(...end),
      progress,
    );
    if (trail.current) {
      const trailProgress = Math.max(0, progress - 0.05);
      trail.current.position.lerpVectors(
        new THREE.Vector3(...start),
        new THREE.Vector3(...end),
        trailProgress,
      );
    }
  });

  return (
    <group>
      <mesh ref={trail}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={ref}>
        <sphereGeometry args={[0.032, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

/* =========================================================
   BACKGROUND PARTICLES
========================================================= */

function BackgroundParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 4.8,
        (Math.random() - 0.5) * 3.2,
        -0.7 - Math.random() * 1.8,
      ],
      color: i % 3 === 0 ? VIOLET : i % 3 === 1 ? MAGENTA : CYAN,
    }));
  }, []);

  return (
    <group>
      {particles.map((item, index) => (
        <mesh key={index} position={item.position}>
          <sphereGeometry args={[0.02, 10, 10]} />
          <meshBasicMaterial color={item.color} transparent opacity={0.75} />
        </mesh>
      ))}
    </group>
  );
}

/* =========================================================
   FLOOR GRID
========================================================= */

function FloorGrid() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current)
      ref.current.material.opacity =
        0.55 + Math.sin(clock.elapsedTime * 0.6) * 0.1;
  });
  return (
    <gridHelper
      ref={ref}
      args={[7, 28, "#1F5C7A", "#0A1B2A"]}
      position={[0, -1.48, -0.8]}
    />
  );
}

/* =========================================================
   SCENE
========================================================= */

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <hemisphereLight args={["#3AC9FF", "#0A0420", 0.5]} />

      <pointLight
        position={[0, 1.4, 3]}
        color={CYAN}
        intensity={3.4}
        distance={7}
      />
      <pointLight
        position={[-2.4, -0.2, 2]}
        color={MAGENTA}
        intensity={2.2}
        distance={5}
      />
      <pointLight
        position={[2.4, 0.1, 1.7]}
        color={VIOLET}
        intensity={2.2}
        distance={5}
      />
      <pointLight
        position={[0, -1.2, 2.5]}
        color={BLUE}
        intensity={1.4}
        distance={5}
      />
      <spotLight
        position={[0, 3.5, 4]}
        angle={0.5}
        penumbra={1}
        intensity={1.4}
        color={WHITE}
      />

      <Float speed={0.9} rotationIntensity={0.03} floatIntensity={0.1}>
        <group position={[0, 0, 0]}>
          <CentralCore />
        </group>
      </Float>

      <Float speed={1.05} rotationIntensity={0.03} floatIntensity={0.1}>
        <group position={[-1.85, 0.72, 0.08]}>
          <ComputerChip />
        </group>
      </Float>

      <Float speed={1} rotationIntensity={0.03} floatIntensity={0.1}>
        <group position={[-1.85, -0.72, -0.05]}>
          <MTTSObject />
        </group>
      </Float>

      <Float speed={1.05} rotationIntensity={0.03} floatIntensity={0.11}>
        <group position={[1.85, 0, 0.1]}>
          <WIEObject />
        </group>
      </Float>

      <NetworkConnections />

      <MovingParticle
        start={[-1.85, 0.72, 0.1]}
        end={[0, 0, 0.05]}
        color={CYAN}
        speed={0.4}
      />
      <MovingParticle
        start={[-1.85, -0.72, -0.02]}
        end={[0, 0, 0.05]}
        color={MAGENTA}
        speed={0.48}
      />
      <MovingParticle
        start={[1.85, 0, 0.1]}
        end={[0, 0, 0.05]}
        color={VIOLET}
        speed={0.44}
      />

      <BackgroundParticles />

      <Sparkles
        count={110}
        scale={[5.2, 3.4, 2.6]}
        size={1.4}
        speed={0.25}
        color={CYAN}
      />
      <Sparkles
        count={50}
        scale={[5.2, 3.4, 2.6]}
        size={1.8}
        speed={0.18}
        color={MAGENTA}
      />

      <FloorGrid />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.9}
        minPolarAngle={Math.PI / 2.6}
        maxAzimuthAngle={Math.PI / 8}
        minAzimuthAngle={-Math.PI / 8}
      />
    </>
  );
}

/* =========================================================
   LABELS — single clean glass badge per node (title + dot + subtitle)
   instead of two stacked/duplicated tags
========================================================= */

function NodeBadge({ node, className }) {
  const { color, label, sub } = NODES[node];
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`absolute pointer-events-auto ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        transform: hovered
          ? "translateY(-2px) scale(1.03)"
          : "translateY(0) scale(1)",
      }}
    >
      <div
        className="rounded-2xl border px-4 py-2.5 backdrop-blur-md sm:px-5"
        style={{
          borderColor: `${color}55`,
          background:
            "linear-gradient(180deg, rgba(4,10,20,0.85), rgba(2,7,17,0.92))",
          boxShadow: hovered
            ? `0 0 32px ${color}55, inset 0 0 20px ${color}22`
            : `0 0 18px ${color}33, inset 0 0 12px ${color}14`,
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 8px 2px ${color}`,
            }}
          />
          <span className="text-sm font-semibold tracking-wide text-white sm:text-base">
            {label}
          </span>
        </div>
        <div className="mt-0.5 pl-3.5 text-[10px] font-medium tracking-[0.15em] text-slate-400 sm:text-[11px]">
          {sub}
        </div>
      </div>
    </div>
  );
}

function Labels() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {/* IEEE core label */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
        <div
          className="rounded-full border px-6 py-2.5 text-lg font-semibold tracking-[0.3em] text-white backdrop-blur-sm sm:px-7 sm:py-3 sm:text-xl"
          style={{
            borderColor: `${CYAN}66`,
            background: "rgba(3,10,20,0.55)",
            boxShadow: `0 0 40px ${CYAN}44, inset 0 0 24px ${CYAN}1a`,
            textShadow: `0 0 18px ${CYAN}aa`,
          }}
        >
          IEEE
        </div>
      </div>

      <NodeBadge
        node="cs"
        className="left-[6%] top-[17%] sm:left-[9%] sm:top-[16%]"
      />
      <NodeBadge
        node="mtt"
        className="left-[6%] top-[68%] sm:left-[9%] sm:top-[66%]"
      />
      <NodeBadge
        node="wie"
        className="right-[4%] top-[34%] sm:right-[7%] sm:top-[33%]"
      />
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function AboutEcosystem3D() {
  return (
    <section className="relative w-full overflow-hidden bg-[#020617]">
      {/* Animated background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
          style={{
            background: `radial-gradient(circle, ${CYAN}22, transparent 70%)`,
            animation: "pulseGlow 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute left-[8%] top-[26%] h-[260px] w-[260px] rounded-full blur-[100px]"
          style={{
            background: `radial-gradient(circle, ${MAGENTA}22, transparent 70%)`,
            animation: "pulseGlow 7s ease-in-out infinite 1s",
          }}
        />
        <div
          className="absolute right-[8%] top-[38%] h-[260px] w-[260px] rounded-full blur-[100px]"
          style={{
            background: `radial-gradient(circle, ${VIOLET}22, transparent 70%)`,
            animation: "pulseGlow 8s ease-in-out infinite 2s",
          }}
        />
      </div>

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.12); }
        }
      `}</style>

      <div className="relative mx-auto h-[580px] w-full max-w-[1200px] sm:h-[640px] lg:h-[700px]">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 0, 5.65], fov: 40 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.25,
          }}
        >
          <Scene />
        </Canvas>

        <Labels />

        <div className="pointer-events-none absolute left-1/2 top-7 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.35em] text-cyan-200/50 sm:text-xs">
          IEEE Technology Ecosystem
        </div>

        <div className="pointer-events-none absolute bottom-5 left-1/2 h-px w-[52%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      </div>
    </section>
  );
}
