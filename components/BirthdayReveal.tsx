'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

export default function BirthdayReveal() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showScrollHint, setShowScrollHint] = useState(false);

  useEffect(() => {
    // Generate heart emoji particles for celebration
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '💞', '♥️', '💙', '💜', '🧡', '💛', '💚'];
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      size: 20 + Math.random() * 30,
    }));
    setParticles(newParticles);

    // Show scroll hint after animation completes
    const timer = setTimeout(() => setShowScrollHint(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50 py-10 px-4">
      {/* Animated multi-layered background gradients */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(156, 39, 176, 0.15) 0%, transparent 50%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 80% 70%, rgba(255, 105, 180, 0.2) 0%, transparent 60%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 90%, rgba(147, 51, 234, 0.12) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* Soft glowing orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-3xl"
          style={{
            width: '300px',
            height: '300px',
            background: [
              'radial-gradient(circle, rgba(156, 39, 176, 0.3) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(255, 105, 180, 0.3) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 70%)',
            ][i],
            left: `${i * 20}%`,
            top: `${(i * 15) % 80}%`,
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating heart emoji particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            fontSize: `${particle.size}px`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.sin(particle.id) * 15, 0],
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.9, 0.5],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        >
          {particle.color}
        </motion.div>
      ))}

      {/* Main Birthday Message */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto w-full">
        {/* Beautiful couple photo with animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, type: 'spring', stiffness: 100 }}
          className="mb-8 relative"
        >
          <motion.div
            className="relative inline-block mx-auto"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Decorative frame glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-full blur-2xl opacity-60" />
            
            {/* Photo container with actual image */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 md:border-8 border-white shadow-2xl bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
              {/* Your actual photo */}
              <img 
                src="/couple-photo.png" 
                alt="Joshya" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating hearts around photo - responsive positioning */}
            {[...Array(8)].map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              const radius = 110;
              return (
                <motion.div
                  key={i}
                  className="absolute text-xl sm:text-2xl md:text-3xl hidden sm:block"
                  style={{
                    left: '50%',
                    top: '50%',
                    marginLeft: `${Math.cos(angle) * radius - 15}px`,
                    marginTop: `${Math.sin(angle) * radius - 15}px`,
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2 + i * 0.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  💕
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* "Happy Birthday" text with gradient */}
        <div className="mb-6">
          <motion.div
            className="elegant text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-3"
            style={{
              background: 'linear-gradient(135deg, #9C27B0 0%, #E91E63 50%, #FF69B4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 4px 20px rgba(156, 39, 176, 0.3))',
            }}
            initial={{ opacity: 0, scale: 0.5, y: -100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.34, 1.56, 0.64, 1],
              delay: 0.5,
            }}
          >
            Happy Birthday
          </motion.div>

          {/* Name "Joshya" with enhanced styling */}
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 1,
              duration: 1.2,
              type: 'spring',
              stiffness: 120,
            }}
          >
            <motion.h1
              className="handwritten text-7xl md:text-9xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #6B21A8 0%, #9C27B0 50%, #EC4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 8px 32px rgba(156, 39, 176, 0.5))',
              }}
              animate={{
                filter: [
                  'drop-shadow(0 8px 32px rgba(156, 39, 176, 0.5))',
                  'drop-shadow(0 12px 40px rgba(156, 39, 176, 0.8))',
                  'drop-shadow(0 8px 32px rgba(156, 39, 176, 0.5))',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              Joshya
            </motion.h1>

            {/* Animated underline with gradient */}
            <motion.div
              className="absolute -bottom-4 left-0 right-0 h-2 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #9C27B0 0%, #E91E63 50%, #FF69B4 100%)',
                boxShadow: '0 4px 20px rgba(156, 39, 176, 0.5)',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Decorative stars around name */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`name-star-${i}`}
                className="absolute text-3xl"
                style={{
                  left: i < 3 ? '-50px' : 'auto',
                  right: i >= 3 ? '-50px' : 'auto',
                  top: `${(i % 3) * 50}px`,
                }}
                initial={{ scale: 0, rotate: 0 }}
                animate={{
                  scale: [0, 1, 0.8],
                  rotate: [0, 180],
                }}
                transition={{
                  delay: 2.5 + i * 0.1,
                  duration: 1,
                }}
              >
                <motion.span
                  style={{ color: i % 2 === 0 ? '#9C27B0' : '#FF69B4' }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  ✨
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Big central heart with gradient - smooth pulse */}
        <motion.div
          className="mt-12"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 2,
            duration: 1.2,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          <motion.div
            className="text-8xl md:text-9xl"
            style={{
              background: 'linear-gradient(135deg, #E91E63, #F472B6, #EC4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 8px 30px rgba(236, 72, 153, 0.6))',
            }}
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 3, -3, 0],
              filter: [
                'drop-shadow(0 8px 30px rgba(236, 72, 153, 0.6))',
                'drop-shadow(0 12px 40px rgba(236, 72, 153, 0.9))',
                'drop-shadow(0 8px 30px rgba(236, 72, 153, 0.6))',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ♥
          </motion.div>
        </motion.div>

        {/* Subtitle with gradient - smooth fade */}
        <motion.p
          className="mt-8 handwritten text-3xl md:text-4xl font-semibold"
          style={{
            background: 'linear-gradient(135deg, #7C3AED, #A855F7, #C084FC)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 1.2, ease: 'easeOut' }}
        >
          Wishing you a day as special as you are!
        </motion.p>
      </div>

      {/* Scroll down indicator */}
      {showScrollHint && (
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="text-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <p className="poppins text-gray-600 mb-2">Scroll down for more surprises</p>
            <motion.div
              className="text-3xl text-primary-red"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ↓
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Floating hearts from bottom - smooth rise */}
      {[...Array(20)].map((_, i) => {
        const gradients = [
          'linear-gradient(135deg, #9C27B0, #E91E63)',
          'linear-gradient(135deg, #EC4899, #F472B6)',
          'linear-gradient(135deg, #A855F7, #C084FC)',
          'linear-gradient(135deg, #DB2777, #F472B6)',
        ];
        const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
        const leftPosition = (i * 5) % 100;
        
        return (
          <motion.div
            key={`float-${i}`}
            className="absolute text-3xl md:text-4xl"
            style={{
              left: `${leftPosition}%`,
              bottom: -50,
              backgroundImage: randomGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 4px 12px rgba(156, 39, 176, 0.4))',
            }}
            animate={{
              y: [0, -window.innerHeight - 100],
              x: [0, Math.sin(i * 0.5) * 80],
              rotate: [0, 180, 360],
              opacity: [0.7, 1, 0],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 10 + (i % 4),
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          >
            ♥
          </motion.div>
        );
      })}
    </section>
  );
}
