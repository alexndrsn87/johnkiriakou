import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";
import type { LocationPoint } from "@/data/locations";

type GlobeSceneProps = {
  points: LocationPoint[];
  selectedId: string;
  onSelect: (id: string) => void;
};

const EARTH_RADIUS = 2.35;

const toVector3 = (lat: number, lng: number, radius = EARTH_RADIUS) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

function Arc({ start, end }: { start: LocationPoint; end: LocationPoint }) {
  const geometry = useMemo(() => {
    const startVec = toVector3(start.lat, start.lng, EARTH_RADIUS + 0.02);
    const endVec = toVector3(end.lat, end.lng, EARTH_RADIUS + 0.02);
    const midVec = startVec.clone().add(endVec).multiplyScalar(0.5).normalize().multiplyScalar(EARTH_RADIUS + 0.75);
    const curve = new THREE.CatmullRomCurve3([startVec, midVec, endVec]);
    return new THREE.TubeGeometry(curve, 60, 0.01, 8, false);
  }, [start.lat, start.lng, end.lat, end.lng]);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color="#5ffbf1" transparent opacity={0.82} />
    </mesh>
  );
}

function Marker({
  point,
  selected,
  onSelect,
}: {
  point: LocationPoint;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  const position = useMemo(() => toVector3(point.lat, point.lng, EARTH_RADIUS + 0.03), [point.lat, point.lng]);

  return (
    <mesh position={position} onClick={() => onSelect(point.id)}>
      <sphereGeometry args={[selected ? 0.05 : 0.037, 16, 16]} />
      <meshBasicMaterial color={selected ? "#facc15" : "#34d399"} />
    </mesh>
  );
}

export default function GlobeScene({ points, selectedId, onSelect }: GlobeSceneProps) {
  const earthMap = useMemo(
    () => new THREE.TextureLoader().load("https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"),
    []
  );
  const bumpMap = useMemo(
    () => new THREE.TextureLoader().load("https://threejs.org/examples/textures/planets/earth_bump_2048.jpg"),
    []
  );
  const specMap = useMemo(
    () => new THREE.TextureLoader().load("https://threejs.org/examples/textures/planets/earth_specular_2048.jpg"),
    []
  );

  const routes = useMemo(() => points.slice(0, -1).map((point, index) => ({ start: point, end: points[index + 1] })), [points]);

  return (
    <Canvas camera={{ position: [0, 0.6, 6.4], fov: 45 }}>
      <color attach="background" args={["#020617"]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[6, 4, 5]} intensity={2.2} color="#94dbff" />
      <pointLight position={[-6, -2, -5]} intensity={1.4} color="#1dd3f8" />

      <Stars radius={50} depth={20} count={6000} factor={3} fade speed={0.6} />

      <Sphere args={[EARTH_RADIUS, 80, 80]}>
        <meshPhongMaterial map={earthMap} bumpMap={bumpMap} bumpScale={0.06} specularMap={specMap} specular="#6797bf" shininess={8} />
      </Sphere>

      <Sphere args={[EARTH_RADIUS + 0.012, 48, 48]}>
        <meshBasicMaterial wireframe transparent opacity={0.22} color="#7dd3fc" />
      </Sphere>

      <Sphere args={[EARTH_RADIUS + 0.16, 48, 48]}>
        <meshBasicMaterial transparent opacity={0.08} color="#60a5fa" />
      </Sphere>

      {routes.map((route) => (
        <Arc key={`${route.start.id}-${route.end.id}`} start={route.start} end={route.end} />
      ))}

      {points.map((point) => (
        <Marker key={point.id} point={point} selected={selectedId === point.id} onSelect={onSelect} />
      ))}

      <OrbitControls enablePan={false} minDistance={4.1} maxDistance={9.8} autoRotate autoRotateSpeed={0.32} />
    </Canvas>
  );
}
