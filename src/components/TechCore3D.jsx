import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function TechCore() {
  const group = useRef();
  const globe = useRef();
  const ring1 = useRef();
  const ring2 = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;

    // Main rotation
    globe.current.rotation.y += delta * 0.18;
    globe.current.rotation.x += delta * 0.03;

    // Orbit rings
    ring1.current.rotation.z += delta * 0.25;
    ring1.current.rotation.x += delta * 0.08;

    ring2.current.rotation.y -= delta * 0.2;
    ring2.current.rotation.z += delta * 0.12;

    // Mouse interaction
    const targetX = state.pointer.y * 0.3;
    const targetY = state.pointer.x * 0.45;

    group.current.rotation.x +=
      (targetX - group.current.rotation.x) * delta * 1.2;

    group.current.rotation.y +=
      (targetY - group.current.rotation.y) * delta * 1.2;
  });

  return (
    <Float speed={1} rotationIntensity={0.12} floatIntensity={0.35}>
      <group ref={group}>
        {/* =========================================
            GLOWING CENTRAL CORE
        ========================================= */}

        <mesh>
          <sphereGeometry args={[0.58, 48, 48]} />

          <meshStandardMaterial
            color="#061827"
            emissive="#00cfff"
            emissiveIntensity={2.5}
            metalness={0.9}
            roughness={0.12}
          />
        </mesh>

        {/* =========================================
            WIREFRAME GLOBE
        ========================================= */}

        <mesh ref={globe}>
          <sphereGeometry args={[0.78, 32, 32]} />

          <meshBasicMaterial
            color="#00d9ff"
            wireframe
            transparent
            opacity={0.38}
          />
        </mesh>

        {/* =========================================
            OUTER RING
        ========================================= */}

        <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.18, 0.018, 16, 120]} />

          <meshBasicMaterial color="#00d9ff" transparent opacity={0.8} />
        </mesh>

        {/* =========================================
            SECOND RING
        ========================================= */}

        <mesh ref={ring2} rotation={[0.8, 0.5, 0]}>
          <torusGeometry args={[0.98, 0.012, 16, 120]} />

          <meshBasicMaterial color="#4da6ff" transparent opacity={0.65} />
        </mesh>

        {/* =========================================
            THIRD RING
        ========================================= */}

        <mesh rotation={[1.2, 0.2, 0]}>
          <torusGeometry args={[0.72, 0.008, 12, 100]} />

          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>

        {/* =========================================
            ORBITING TECHNOLOGY NODES
        ========================================= */}

        <mesh position={[1.2, 0, 0]}>
          <sphereGeometry args={[0.055, 20, 20]} />
          <meshBasicMaterial color="#00e5ff" />
        </mesh>

        <mesh position={[-1.2, 0, 0]}>
          <sphereGeometry args={[0.045, 20, 20]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.05, 20, 20]} />
          <meshBasicMaterial color="#4da6ff" />
        </mesh>

        <mesh position={[0, -1.2, 0]}>
          <sphereGeometry args={[0.045, 20, 20]} />
          <meshBasicMaterial color="#00cfff" />
        </mesh>

        <mesh position={[0, 0, 1.2]}>
          <sphereGeometry args={[0.045, 20, 20]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        <mesh position={[0, 0, -1.2]}>
          <sphereGeometry args={[0.04, 20, 20]} />
          <meshBasicMaterial color="#00cfff" />
        </mesh>

        {/* =========================================
            SMALL INNER CORE
        ========================================= */}

        <mesh>
          <sphereGeometry args={[0.25, 32, 32]} />

          <meshBasicMaterial color="#00d9ff" transparent opacity={0.18} />
        </mesh>
      </group>
    </Float>
  );
}

export default function TechCore3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{
          position: [0, 0, 4.5],
          fov: 45,
        }}
        dpr={[1, 1.5]}
      >
        {/* Lighting */}

        <ambientLight intensity={0.4} />

        <pointLight position={[3, 3, 4]} intensity={4} color="#00cfff" />

        <pointLight position={[-3, -2, 2]} intensity={2} color="#4da6ff" />

        {/* Main object */}

        <TechCore />

        {/* Background particles */}

        <Sparkles count={140} scale={5} size={1.6} speed={0.3} />
      </Canvas>
    </div>
  );
}
