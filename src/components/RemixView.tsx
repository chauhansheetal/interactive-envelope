import { useState } from 'react';
import type { EnvelopeStyle, SelectionMode, Photo } from '../types';
import PhotoStack from './PhotoStack';
import ControlPanel from './ControlPanel';
import { Canvas } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface RemixViewProps {
  envelopeStyle: EnvelopeStyle;
  onEnvelopeStyleChange: (style: EnvelopeStyle) => void;
  stamp?: { message: string };
  onStampChange: (message: string) => void;
  photos: Photo[];
  onPhotosChange: (photos: Photo[]) => void;
  onBack: () => void;
}

const ENVELOPE_COLORS: Record<EnvelopeStyle, string> = {
  orange: '#FF8C42',
  blue: '#4A90E2',
  pink: '#FF6B9D',
  green: '#6BCF7F',
  purple: '#9B6BCE',
  red: '#E74C3C',
};

function SimpleEnvelope({
  color,
  stamp,
}: {
  color: string;
  stamp?: { message: string };
}) {
  return (
    <group position={[0, 0, 0]}>
      {/* Main envelope body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 2, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Envelope flap */}
      <mesh position={[0, 1, 0.03]}>
        <boxGeometry args={[3, 1.2, 0.05]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} />
      </mesh>

      {/* Triangle flap detail */}
      <mesh position={[0, 0.4, 0.03]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[1.5, 1.2, 3]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} />
      </mesh>

      {/* Stamp */}
      {stamp && stamp.message && (
        <group position={[1, 0.5, 0.06]}>
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
    </group>
  );
}

export default function RemixView({
  envelopeStyle,
  onEnvelopeStyleChange,
  stamp,
  onStampChange,
  photos,
  onPhotosChange,
  onBack,
}: RemixViewProps) {
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('cover');
  const [layoutMode, setLayoutMode] = useState<'stack' | 'roll' | 'grid'>('stack');

  const handleFilterApply = (photoId: string, filterId: string) => {
    const updatedPhotos = photos.map((photo) =>
      photo.id === photoId ? { ...photo, filter: filterId } : photo
    );
    onPhotosChange(updatedPhotos);
  };

  const handleCustomStyleUpload = (file: File) => {
    // Placeholder for custom style transfer
    console.log('Custom style uploaded:', file.name);
    // In production, this would send to nano banan pro API
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            ← Back
          </button>

          {/* Layout Mode Selector (only for photos) */}
          {selectionMode === 'photos' && photos.length > 0 && (
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setLayoutMode('stack')}
                className={`px-4 py-2 rounded transition-all ${
                  layoutMode === 'stack'
                    ? 'bg-white shadow text-purple-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                STACK
              </button>
              <button
                onClick={() => setLayoutMode('roll')}
                className={`px-4 py-2 rounded transition-all ${
                  layoutMode === 'roll'
                    ? 'bg-white shadow text-purple-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                ROLL
              </button>
              <button
                onClick={() => setLayoutMode('grid')}
                className={`px-4 py-2 rounded transition-all ${
                  layoutMode === 'grid'
                    ? 'bg-white shadow text-purple-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                GRID
              </button>
            </div>
          )}

          <div className="w-32" /> {/* Spacer for symmetry */}
        </div>

        {/* Preview Area */}
        <div className="flex-1 p-8 overflow-hidden">
          {selectionMode === 'cover' ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-[600px] h-[500px]">
                <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[5, 5, 5]} intensity={1} />
                  <pointLight position={[-5, -5, 5]} intensity={0.5} />
                  <SimpleEnvelope color={ENVELOPE_COLORS[envelopeStyle]} stamp={stamp} />
                </Canvas>
              </div>
            </div>
          ) : (
            <PhotoStack photos={photos} layoutMode={layoutMode} />
          )}
        </div>
      </div>

      {/* Control Panel */}
      <ControlPanel
        selectionMode={selectionMode}
        onSelectionModeChange={setSelectionMode}
        envelopeStyle={envelopeStyle}
        onEnvelopeStyleChange={onEnvelopeStyleChange}
        stamp={stamp}
        onStampChange={onStampChange}
        photos={photos}
        onPhotosChange={onPhotosChange}
        onFilterApply={handleFilterApply}
        onCustomStyleUpload={handleCustomStyleUpload}
      />
    </div>
  );
}
