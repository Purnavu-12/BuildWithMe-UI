'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { enginePoint } from '@/lib/engine-shapes';

function WirePlane({
  paper,
  width = 1.2,
  height = 3,
}: {
  paper: boolean;
  width?: number;
  height?: number;
}) {
  const geometry = useMemo(() => {
    const vertices: number[] = [];
    for (let i = 0; i <= 8; i++) {
      const x = -width / 2 + (width * i) / 8;
      vertices.push(x, -height / 2, 0, x, height / 2, 0);
    }
    for (let i = 0; i <= 12; i++) {
      const y = -height / 2 + (height * i) / 12;
      vertices.push(-width / 2, y, 0, width / 2, y, 0);
    }
    return new THREE.BufferGeometry().setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3),
    );
  }, [width, height]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial
        color={paper ? '#728077' : '#c3d0bc'}
        transparent
        opacity={paper ? 0.3 : 0.42}
        toneMapped={false}
      />
    </lineSegments>
  );
}

function CameraFraming() {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera) || !size.height) return;
    const halfFov = THREE.MathUtils.degToRad(camera.fov / 2);
    const distance = Math.max(
      1.85 / Math.tan(halfFov),
      6 / ((size.width / size.height) * Math.tan(halfFov)),
    );
    camera.position.set(0, 0.1, distance * 1.06);
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, size.width, size.height, invalidate]);
  return null;
}

function Engine({
  chapter,
  count,
  active,
  paper,
}: {
  chapter: number;
  count: number;
  active: boolean;
  paper: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.InstancedMesh>(null);
  const core = useRef<THREE.InstancedMesh>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const current = useMemo(
    () =>
      Array.from({ length: count }, (_, index) =>
        new THREE.Vector3().copy(enginePoint(index, count, chapter)),
      ),
    [count, chapter],
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const lineArray = useMemo(() => new Float32Array(count * 6), [count]);
  const geometry = useMemo(() => {
    const value = new THREE.BufferGeometry();
    value.setAttribute('position', new THREE.BufferAttribute(lineArray, 3));
    return value;
  }, [lineArray]);
  const invalidate = useThree((state) => state.invalidate);
  const clock = useRef(0);

  const update = useCallback(
    (delta: number, snap = false) => {
      if (!group.current || !nodes.current || !lines.current || !core.current) return;
      if (active) clock.current += Math.min(delta, 0.05);
      const damping = snap ? 1 : 1 - Math.exp(-Math.min(delta, 0.05) * 5);
      current.forEach((point, index) => {
        const first = enginePoint(index, count, chapter);
        const x = first.x + Math.sin(clock.current * 0.35 + index) * 0.035;
        const y = first.y + Math.cos(clock.current * 0.3 + index) * 0.035;
        const z = first.z;
        point.x += (x - point.x) * damping;
        point.y += (y - point.y) * damping;
        point.z += (z - point.z) * damping;
        dummy.position.copy(point);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.setScalar(index % 7 === 0 ? 1.6 : 0.85);
        dummy.updateMatrix();
        nodes.current!.setMatrixAt(index, dummy.matrix);
        const neighbor = current[(index + (chapter === 2 ? 3 : 1)) % count];
        const offset = index * 6;
        lineArray[offset] = point.x;
        lineArray[offset + 1] = point.y;
        lineArray[offset + 2] = point.z;
        lineArray[offset + 3] = neighbor.x;
        lineArray[offset + 4] = neighbor.y;
        lineArray[offset + 5] = neighbor.z;
      });
      for (let index = 0; index < 4; index++) {
        const spread =
          chapter === 2
            ? (index - 1.5) * 1.75
            : chapter === 3
              ? (index - 1.5) * 0.75
              : [0, -0.65, 0.65, 0][index];
        const height = chapter > 1 ? 0 : [0.67, -0.38, -0.38, 0][index];
        dummy.position.set(spread, height, 0.45);
        dummy.rotation.set(0.56, 0.72, Math.sin(clock.current * 0.3) * 0.035);
        dummy.scale.setScalar(chapter === 1 || (chapter === 0 && index === 3) ? 0 : 0.76);
        dummy.updateMatrix();
        core.current.setMatrixAt(index, dummy.matrix);
      }
      core.current.instanceMatrix.needsUpdate = true;
      nodes.current.instanceMatrix.needsUpdate = true;
      geometry.attributes.position.needsUpdate = true;
      group.current.rotation.y = Math.sin(clock.current * 0.15) * 0.045;
    },
    [active, chapter, count, current, dummy, geometry, lineArray],
  );

  useEffect(() => {
    update(0, true);
    invalidate();
  }, [update, invalidate]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useFrame((_state, delta) => update(delta));

  return (
    <group ref={group}>
      <lineSegments ref={lines} geometry={geometry}>
        <lineBasicMaterial
          color={paper ? '#59605b' : '#bfc8b4'}
          transparent
          opacity={paper ? 0.24 : 0.22}
        />
      </lineSegments>
      <instancedMesh ref={nodes} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.027, 6, 6]} />
        <meshBasicMaterial color={paper ? '#394632' : '#d6ff59'} toneMapped={false} />
      </instancedMesh>
      <instancedMesh ref={core} args={[undefined, undefined, 4]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#d6ff59"
          roughness={0.52}
          metalness={0.05}
          toneMapped={false}
        />
      </instancedMesh>
      {chapter !== 1 &&
        [-1, 1].map((side) => (
          <group
            key={side}
            position={[side * 2.6, 0, 0]}
            rotation={[0, side * -0.18, side === -1 ? 0.45 : Math.PI + 0.45]}
          >
            <mesh>
              <ringGeometry args={[1.1, 1.34, 52, 1, 0.25, Math.PI * 1.1]} />
              <meshBasicMaterial color="#00d8ef" side={THREE.DoubleSide} toneMapped={false} />
            </mesh>
          </group>
        ))}
      {[-1, 1].map((side) => (
        <group
          key={side}
          position={[side * (chapter === 1 ? 1.6 : 4.25), 0.1, -0.2]}
          rotation={[0, side * 0.6, 0]}
        >
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[0.8, 2.3, 0.07]} />
            <meshStandardMaterial
              color={chapter === 1 && side === -1 ? '#00d8ef' : '#ff7469'}
              roughness={0.6}
              toneMapped={false}
            />
          </mesh>
          {chapter === 1 && side === 1 && (
            <mesh position={[0, 0.15, 0.08]}>
              <planeGeometry args={[0.42, 0.68]} />
              <meshBasicMaterial color="#101511" />
            </mesh>
          )}
          <mesh position={[-side * 0.9, -0.4, 0.3]}>
            <boxGeometry args={[0.35, 1.55, 0.06]} />
            <meshStandardMaterial color={paper ? '#4c5754' : '#f3f0e8'} roughness={0.7} />
          </mesh>
          <group position={[side * 0.4, 0, -0.2]}>
            <WirePlane paper={paper} />
          </group>
          <mesh position={[side * -0.5, -0.3, 0.5]} scale={[0.7, 1, 1]}>
            <sphereGeometry args={[0.42, 20, 16]} />
            <meshStandardMaterial color={side === -1 ? '#f3f0e8' : '#ff7469'} roughness={0.45} />
          </mesh>
        </group>
      ))}
      {chapter === 0 && (
        <>
          <mesh position={[-1.75, -0.05, 0.5]} rotation={[0.5, 0.7, 0]}>
            <boxGeometry args={[0.28, 0.28, 0.28]} />
            <meshStandardMaterial color="#ff7469" toneMapped={false} />
          </mesh>
          <mesh position={[1.2, 0.3, 0.3]} rotation={[0.5, 0.7, 0]}>
            <boxGeometry args={[0.14, 0.14, 0.14]} />
            <meshBasicMaterial color="#00d8ef" toneMapped={false} />
          </mesh>
          <mesh position={[4.65, -0.95, 0.1]} rotation={[0.5, 0.7, 0]}>
            <boxGeometry args={[0.24, 0.24, 0.24]} />
            <meshStandardMaterial color="#d6ff59" toneMapped={false} />
          </mesh>
          <mesh position={[3.65, 1.35, 0.1]} scale={[0.65, 1, 1]}>
            <sphereGeometry args={[0.13, 12, 12]} />
            <meshBasicMaterial color="#f3f0e8" />
          </mesh>
        </>
      )}
    </group>
  );
}

function ContextLifecycle({ onReady, onFail }: { onReady: () => void; onFail: () => void }) {
  const canvas = useThree((state) => state.gl.domElement);
  useEffect(() => {
    const lost = (event: Event) => {
      event.preventDefault();
      onFail();
    };
    canvas.addEventListener('webglcontextlost', lost);
    onReady();
    return () => canvas.removeEventListener('webglcontextlost', lost);
  }, [canvas, onReady, onFail]);
  return null;
}

export default function CosmosUniverse({
  activeChapter,
  active,
  nodeCount,
  paper,
  onReady,
  onFail,
}: {
  activeChapter: number;
  active: boolean;
  nodeCount: number;
  paper: boolean;
  onReady: () => void;
  onFail: () => void;
}) {
  return (
    <Canvas
      // Measure layout dimensions: Motion applies the artboard scale once.
      resize={{ offsetSize: true, scroll: false }}
      frameloop={active ? 'always' : 'demand'}
      dpr={[1, 1.4]}
      camera={{ position: [0, 0.12, 10.8], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[-3, 5, 6]} intensity={2.2} />
      <CameraFraming />
      <Engine
        chapter={activeChapter}
        count={Math.min(nodeCount, 120)}
        active={active}
        paper={paper}
      />
      <ContextLifecycle onReady={onReady} onFail={onFail} />
    </Canvas>
  );
}
