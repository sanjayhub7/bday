'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import PhotoCard from './PhotoCard';

const memories = [
  { id: 1, image: '/memories/photo1.jpg.jpeg', caption: 'Wow in saree 😍', date: '', rotation: -5, aspectRatio: 'portrait' as const },
  { id: 2, image: '/memories/photo2.jpg.jpeg', caption: 'Beauty in yellow 💛', date: '', rotation: 3, aspectRatio: 'portrait' as const },
  { id: 3, image: '/memories/photo3.jpg.jpeg', caption: 'The flowerly girl 🌸', date: '', rotation: -3, aspectRatio: 'portrait' as const },
  { id: 4, image: '/memories/photo4.jpg.jpeg', caption: 'Cute bunny pic 🐰', date: '', rotation: 5, aspectRatio: 'square' as const },
  { id: 5, image: '/memories/photo5jpg.jpeg', caption: 'Need to recreate 📸', date: '', rotation: -4, aspectRatio: 'square' as const },
  { id: 6, image: '/memories/photo6.jpg.jpeg', caption: 'Lovely memories 💕', date: '', rotation: 2, aspectRatio: 'square' as const },
];

export default function MemoryGallery() {
  const sectionRef = useRef<HTMLElement>(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section ref={sectionRef} className="min-h-screen py-20 px-4 bg-soft-pink paper-texture relative overflow-hidden">
      {/* Decorative washi tape */}
      <div className="absolute top-0 left-0 w-full h-8 bg-primary-red opacity-20" 
           style={{ transform: 'rotate(-2deg)', transformOrigin: 'left' }} />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="elegant text-5xl md:text-6xl text-primary-red mb-4">
          Beautiful Memories
        </h2>
        <p className="handwritten text-2xl text-gray-700">
          Every moment with you is a treasure
        </p>
      </motion.div>

      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {memories.map((memory, index) => (
          <PhotoCard
            key={memory.id}
            image={memory.image}
            caption={memory.caption}
            date={memory.date}
            rotation={memory.rotation}
            delay={index * 0.1}
            aspectRatio={memory.aspectRatio}
          />
        ))}
      </motion.div>

      {/* Floating decorative elements */}
      <div className="absolute bottom-10 right-10 opacity-30">
        <motion.div
          className="handwritten text-6xl text-primary-red"
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          ♥
        </motion.div>
      </div>
    </section>
  );
}
