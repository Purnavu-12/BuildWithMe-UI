'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const nodeCount = 40;

function Network() {
  const group = useRef<THREE.Group>(null);
  const points = useMemo(
    () =>
      Array.from({ length: nodeCount }, (_, index) => {
        const angle = (index / nodeCount) * Math.PI * 2;
        const layer = (index % 3) - 1;
        const radius = 2.15 + (index % 5) * 0.13;
        return new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle * 2.1) * 0.65 + layer * 0.34,
          Math.sin(angle) * radius,
        );
      }),
    [],
  );
  const lineGeometry = useMemo(() => {
    const vertices: number[] = [];
    points.forEach((point, index) => {
      const next = points[(index + 1) % points.length];
      const cross = points[(index + 7) % points.length];
      vertices.push(point.x, point.y, point.z, next.x, next.y, next.z);
      if (index % 2 === 0) vertices.push(point.x, point.y, point.z, cross.x, cross.y, cross.z);
    });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
  }, [points]);
  const { pointer } = useThree();
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.055;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * 0.12, 0.025);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -pointer.x * 0.08, 0.025);
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.34) * 0.08;
  });
  return (
    <group ref={group} rotation={[0.16, 0.1, -0.08]}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#646464" transparent opacity={0.22} />
      </lineSegments>
      {points.map((point, index) => (
        <mesh key={index} position={point} scale={index % 7 === 0 ? 1.35 : 1}>
          <icosahedronGeometry args={[0.055, 1]} />
          <meshBasicMaterial color={index % 7 === 0 ? '#ffffff' : '#8a8a8a'} />
        </mesh>
      ))}
      {[2.65, 3.15, 3.65].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2 + index * 0.2, index * 0.36, 0]}>
          <torusGeometry args={[radius, 0.008, 6, 160]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.18 - index * 0.035} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroUniverse() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const update = () => setVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  return (
    <Canvas
      aria-hidden="true"
      frameloop={visible ? 'always' : 'never'}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Network />
    </Canvas>
  );
}
