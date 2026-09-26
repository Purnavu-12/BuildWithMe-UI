'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function positionsFor(chapter: number, count: number) {
  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2;
    if (chapter === 0) return new THREE.Vector3(Math.cos(angle) * 0.16, Math.sin(angle) * 0.16, (index % 4) * 0.02);
    if (chapter === 1) return new THREE.Vector3(Math.cos(angle) * (2.1 + (index % 5) * 0.12), Math.sin(angle * 2.1) * 0.8, Math.sin(angle) * 2.1);
    if (chapter === 2) {
      const cluster = index % 3;
      const local = Math.floor(index / 3);
      const localAngle = (local / Math.ceil(count / 3)) * Math.PI * 2;
      return new THREE.Vector3((cluster - 1) * 2.05 + Math.cos(localAngle) * 0.65, Math.sin(localAngle) * 0.75, Math.sin(localAngle) * 0.35);
    }
    if (chapter === 3) return new THREE.Vector3((index % 8) * 0.6 - 2.1, Math.floor(index / 8) * -0.48 + 1, Math.sin(index) * 0.08);
    return new THREE.Vector3(Math.cos(angle) * (2.45 + Math.sin(index * 2.4) * 0.18), Math.sin(angle) * 2.45, Math.cos(angle * 3) * 0.5);
  });
}

function Constellation({ activeChapter, nodeCount }: { activeChapter: number; nodeCount: number }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.InstancedMesh>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const current = useMemo(() => positionsFor(0, nodeCount), [nodeCount]);
  const target = useMemo(() => positionsFor(activeChapter, nodeCount), [activeChapter, nodeCount]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const linePositions = useMemo(() => new Float32Array(nodeCount * 6), [nodeCount]);
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    return geometry;
  }, [linePositions]);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!group.current || !mesh.current || !lines.current) return;
    const damping = 1 - Math.exp(-delta * 3.8);
    current.forEach((point, index) => {
      point.lerp(target[index], damping);
      dummy.position.copy(point);
      const pulse = index % 7 === 0 ? 1.7 + Math.sin(state.clock.elapsedTime * 1.4 + index) * 0.18 : 0.86;
      dummy.scale.setScalar(pulse);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(index, dummy.matrix);
      const next = current[(index + (activeChapter === 2 ? 3 : 1)) % nodeCount];
      linePositions.set([point.x, point.y, point.z, next.x, next.y, next.z], index * 6);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    lines.current.geometry.attributes.position.needsUpdate = true;
    group.current.rotation.y += delta * 0.035;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * 0.08, 0.03);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -pointer.x * 0.06, 0.03);
  });
  return (
    <group ref={group} rotation={[0.08, 0, -0.05]}>
      <lineSegments ref={lines} geometry={lineGeometry}><lineBasicMaterial color="#7b7b78" transparent opacity={0.22} /></lineSegments>
      <instancedMesh ref={mesh} args={[undefined, undefined, nodeCount]}>
        <icosahedronGeometry args={[0.075, 1]} />
        <meshBasicMaterial color="#f3f3ef" />
      </instancedMesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[2.9, 0.008, 4, 180]} /><meshBasicMaterial color="#8b8b87" transparent opacity={0.2} /></mesh>
    </group>
  );
}

export default function CosmosUniverse({ activeChapter, active, nodeCount }: { activeChapter: number; active: boolean; nodeCount: number }) {
  return (
    <Canvas frameloop={active ? 'always' : 'never'} dpr={[1, 1.4]} camera={{ position: [0, 0, 7.4], fov: 42 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
      <Constellation activeChapter={activeChapter} nodeCount={nodeCount} />
    </Canvas>
  );
}

