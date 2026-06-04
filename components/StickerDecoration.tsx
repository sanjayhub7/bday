'use client';

import { motion } from 'framer-motion';

interface StickerDecorationProps {
  type: 'heart' | 'star' | 'flower' | 'sparkle';
  size?: number;
}

export default function StickerDecoration({ type, size = 40 }: StickerDecorationProps) {
  const stickers = {
    heart: '♥',
    star: '★',
    flower: '✿',
    sparkle: '✨',
  };

  return (
    <motion.div
      className="handwritten text-primary-red"
      style={{ fontSize: `${size}px` }}
      whileHover={{ scale: 1.2, rotate: 15 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {stickers[type]}
    </motion.div>
  );
}
