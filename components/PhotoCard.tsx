'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface PhotoCardProps {
  image: string;
  caption: string;
  date: string;
  rotation: number;
  delay?: number;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

export default function PhotoCard({ image, caption, date, rotation, delay = 0, aspectRatio = 'square' }: PhotoCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50 
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      drag
      dragElastic={0.05}
      dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      whileHover={{ 
        scale: 1.05, 
        rotate: 0, 
        zIndex: 10,
        transition: { duration: 0.2 }
      }}
      className={`relative cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
      style={{ rotate: rotation }}
    >
      {/* Polaroid frame */}
      <div className="bg-white p-4 pb-16 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
        {/* Tape decoration */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-gold opacity-40 rotate-2" />
        
        {/* Photo */}
        <div className={`relative w-full bg-gray-200 mb-4 overflow-hidden ${
          aspectRatio === 'square' ? 'aspect-square' : 
          aspectRatio === 'portrait' ? 'aspect-[3/4]' : 
          'aspect-[4/3]'
        }`}>
          <img 
            src={image} 
            alt={caption}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 items-center justify-center hidden">
            <span className="text-gray-500 text-sm elegant">Photo {caption}</span>
          </div>
        </div>

        {/* Caption */}
        <div className="text-center">
          <p className="handwritten text-xl text-gray-800 mb-1">{caption}</p>
          <p className="poppins text-xs text-gray-500">{date}</p>
        </div>

        {/* Paper clip decoration */}
        <motion.div
          className="absolute -right-2 top-8 w-6 h-8 border-2 border-gray-400 rounded-full opacity-50"
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Shadow effect */}
      <div className="absolute inset-0 bg-black opacity-10 blur-md -z-10 translate-y-2" />
    </motion.div>
  );
}
