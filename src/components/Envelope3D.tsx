import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import type { EnvelopeStyle, Photo } from '../types';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

interface Envelope3DProps {
  style: EnvelopeStyle;
  photos: Photo[];
  stamp?: { message: string };
  onRemixClick?: () => void;
}

const ENVELOPE_COLORS: Record<EnvelopeStyle, string> = {
  orange: '#FF8C42',
  blue: '#4A90E2',
  pink: '#FF6B9D',
  green: '#6BCF7F',
  purple: '#9B6BCE',
  red: '#E74C3C',
};

function EnvelopeMesh({
  color,
  isHovered,
  photos,
  stamp,
}: {
  color: string;
  isHovered: boolean;
  photos: Photo[];
  stamp?: { message: string };
}) {
  const groupRef = useRef<THREE.Group>(null);
  const flapRef = useRef<THREE.Mesh>(null);

  // Animated rotation for the flap
  const { rotation } = useSpring({
    rotation: isHovered ? -Math.PI * 0.35 : 0,
    config: { mass: 1, tension: 170, friction: 26 },
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main envelope body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 2, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Envelope flap */}
      <animated.group
        position={[0, 1, 0.03] as any}
        rotation-x={rotation as any}
      >
        <mesh ref={flapRef} position={[0, 0.6, 0]}>
          <boxGeometry args={[3, 1.2, 0.05]} />
          <meshStandardMaterial color={color} side={THREE.DoubleSide} />
        </mesh>

        {/* Triangle flap detail */}
        <mesh position={[0, -0.6, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[1.5, 1.2, 3]} />
          <meshStandardMaterial color={color} side={THREE.DoubleSide} />
        </mesh>
      </animated.group>

      {/* Stamp */}
      {stamp && (
        <group position={[1, 0.5, 0.03]}>
          <mesh>
            <planeGeometry args={[0.8, 0.6]} />
            <meshStandardMaterial color="#DC143C" />
          </mesh>
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.12}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={0.7}
          >
            {stamp.message}
          </Text>
        </group>
      )}

      {/* Photos spilling out */}
      {isHovered && photos.length > 0 && (
        <group position={[0, 0, 0.5]}>
          {photos.slice(0, 5).map((photo, index) => (
            <PhotoCard
              key={photo.id}
              photoUrl={photo.url}
              index={index}
              total={Math.min(photos.length, 5)}
            />
          ))}
        </group>
      )}
    </group>
  );
}

function PhotoCard({
  photoUrl,
  index,
  total,
}: {
  photoUrl: string;
  index: number;
  total: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture] = useState(() => {
    const loader = new THREE.TextureLoader();
    return loader.load(photoUrl);
  });

  // Stagger animation for photos
  const offsetX = (index - total / 2) * 0.4;
  const offsetY = index * 0.3 + 1;
  const rotation = (index - total / 2) * 0.15;

  const { position, rotationZ } = useSpring({
    from: { position: [0, 0, 0] as [number, number, number], rotationZ: 0 },
    to: {
      position: [offsetX, offsetY, 0.5 + index * 0.1] as [number, number, number],
      rotationZ: rotation,
    },
    config: { mass: 1, tension: 120, friction: 20 },
    delay: index * 100,
  });

  return (
    <animated.mesh
      ref={meshRef}
      position={position as any}
      rotation-z={rotationZ as any}
    >
      <planeGeometry args={[1.2, 0.9]} />
      <meshStandardMaterial map={texture} />
      {/* Photo border */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.25, 0.95]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </animated.mesh>
  );
}

export default function Envelope3D({
  style,
  photos,
  stamp,
  onRemixClick,
}: Envelope3DProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div
        className="w-full max-w-4xl h-[600px] cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, -5, 5]} intensity={0.5} />
          <EnvelopeMesh
            color={ENVELOPE_COLORS[style]}
            isHovered={isHovered}
            photos={photos}
            stamp={stamp}
          />
        </Canvas>
      </div>

      {/* Remix Button */}
      {onRemixClick && (
        <button
          onClick={onRemixClick}
          className="mt-8 px-8 py-3 bg-white text-purple-600 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          Remix
        </button>
      )}
    </div>
  );
}
