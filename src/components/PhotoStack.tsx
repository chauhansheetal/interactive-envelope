import { useState } from 'react';
import type { Photo } from '../types';
import { motion } from 'framer-motion';

interface PhotoStackProps {
  photos: Photo[];
  layoutMode: 'stack' | 'roll' | 'grid';
}

export default function PhotoStack({ photos, layoutMode }: PhotoStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderStack = () => (
    <div className="relative w-full h-full flex items-center justify-center">
      {photos.map((photo, index) => {
        const offset = (index - activeIndex) * 20;
        const rotation = (index - activeIndex) * 3;
        const zIndex = photos.length - Math.abs(index - activeIndex);

        return (
          <motion.div
            key={photo.id}
            className="absolute w-[400px] h-[300px] bg-white rounded-lg shadow-2xl overflow-hidden cursor-pointer"
            style={{ zIndex }}
            initial={{ x: 0, y: 0, rotate: 0 }}
            animate={{
              x: offset,
              y: offset * 0.5,
              rotate: rotation,
              scale: index === activeIndex ? 1 : 0.95,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={() => setActiveIndex(index)}
          >
            <img
              src={photo.url}
              alt={`Photo ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border-8 border-white pointer-events-none" />
          </motion.div>
        );
      })}
    </div>
  );

  const renderRoll = () => (
    <div className="relative w-full h-full overflow-x-auto overflow-y-hidden">
      <div className="flex items-center space-x-4 p-8 h-full">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            className="flex-shrink-0 w-[350px] h-[280px] bg-white rounded-lg shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
          >
            <img
              src={photo.url}
              alt={`Photo ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border-8 border-white pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderGrid = () => (
    <div className="grid grid-cols-3 gap-6 p-8 w-full h-full overflow-auto">
      {photos.map((photo, index) => (
        <motion.div
          key={photo.id}
          className="aspect-[4/3] bg-white rounded-lg shadow-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={photo.url}
            alt={`Photo ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 border-8 border-white pointer-events-none" />
        </motion.div>
      ))}
    </div>
  );

  if (photos.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-xl">
        No photos added yet
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      {layoutMode === 'stack' && renderStack()}
      {layoutMode === 'roll' && renderRoll()}
      {layoutMode === 'grid' && renderGrid()}
    </div>
  );
}
