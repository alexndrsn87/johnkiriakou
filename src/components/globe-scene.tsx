import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";
import type { LocationPoint } from "@/data/locations";

type GlobeSceneProps = {
  points: LocationPoint[];
  routes: { id: string; start: LocationPoint; end: LocationPoint }[];
  selectedId: string;
  autoRotate: boolean;
  interactionMode: "idle" | "selected" | "reading";
  activeRouteId: string | null;
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

function Arc({
  start,
  end,
  isActive,
}: {
  start: LocationPoint;
  end: LocationPoint;
  isActive: boolean;
}) {
  const geometry = useMemo(() => {
    const startVec = toVector3(start.lat, start.lng, EARTH_RADIUS + 0.02);
    const endVec = toVector3(end.lat, end.lng, EARTH_RADIUS + 0.02);
    const midVec = startVec.clone().add(endVec).multiplyScalar(0.5).normalize().multiplyScalar(EARTH_RADIUS + 0.75);
    const curve = new THREE.CatmullRomCurve3([startVec, midVec, endVec]);
    return new THREE.TubeGeometry(curve, 60, 0.004, 8, false);
  }, [start.lat, start.lng, end.lat, end.lng]);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color={isActive ? "#7df9ff" : "#5ffbf1"} transparent opacity={isActive ? 0.7 : 0.22} />
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

function GlobeContent({
  points,
  routes,
  selectedId,
  interactionMode,
  activeRouteId,
  onSelect,
}: {
  points: LocationPoint[];
  routes: { id: string; start: LocationPoint; end: LocationPoint }[];
  selectedId: string;
  interactionMode: "idle" | "selected" | "reading";
  activeRouteId: string | null;
  onSelect: (id: string) => void;
}) {
  const globeGroupRef = useRef<THREE.Group>(null);
  const targetQuaternionRef = useRef(new THREE.Quaternion());
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

  const selectedPoint = useMemo(
    () => points.find((point) => point.id === selectedId) ?? points[0],
    [points, selectedId]
  );

  useFrame(() => {
    if (!globeGroupRef.current || !selectedPoint) {
      return;
    }

    const selectedVector = toVector3(selectedPoint.lat, selectedPoint.lng, 1).normalize();
    const frontVector = new THREE.Vector3(0, 0, 1);
    targetQuaternionRef.current.setFromUnitVectors(selectedVector, frontVector);

    // Keep the globe upright by removing roll while allowing vertical pitch motion.
    const targetEuler = new THREE.Euler().setFromQuaternion(targetQuaternionRef.current, "YXZ");
    targetEuler.z = 0;
    targetQuaternionRef.current.setFromEuler(targetEuler);

    const damping = interactionMode === "reading" ? 0.045 : 0.075;
    globeGroupRef.current.quaternion.slerp(targetQuaternionRef.current, damping);
  });

  return (
    <group ref={globeGroupRef}>
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
        <Arc key={route.id} start={route.start} end={route.end} isActive={route.id === activeRouteId} />
      ))}

      {points.map((point) => (
        <Marker key={point.id} point={point} selected={selectedId === point.id} onSelect={onSelect} />
      ))}
    </group>
  );
}

export default function GlobeScene({
  points,
  routes,
  selectedId,
  autoRotate,
  interactionMode,
  activeRouteId,
  onSelect,
}: GlobeSceneProps) {
  return (
    <Canvas camera={{ position: [0, 0.6, 6.4], fov: 45 }}>
      <color attach="background" args={["#020617"]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[6, 4, 5]} intensity={2.2} color="#94dbff" />
      <pointLight position={[-6, -2, -5]} intensity={1.4} color="#1dd3f8" />

      <Stars radius={50} depth={20} count={6000} factor={3} fade speed={0.6} />

      <GlobeContent
        points={points}
        routes={routes}
        selectedId={selectedId}
        interactionMode={interactionMode}
        activeRouteId={activeRouteId}
        onSelect={onSelect}
      />

      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={4.1}
        maxDistance={9.8}
        autoRotate={autoRotate}
        autoRotateSpeed={0.32}
      />
    </Canvas>
  );
}
