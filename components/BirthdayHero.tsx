'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface BirthdayHeroProps {
  onEnvelopeOpen: () => void;
}

interface Particle {
  id: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
}

interface FloatingHeart {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
}

interface Sparkle {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
}

interface Ribbon {
  id: number;
  left: string;
  rotation: number;
  color: string;
  delay: number;
}

interface MouseHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export default function BirthdayHero({ onEnvelopeOpen }: BirthdayHeroProps) {
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [ribbons, setRibbons] = useState<Ribbon[]>([]);
  const [mouseHearts, setMouseHearts] = useState<MouseHeart[]>([]);
  const heartIdRef = useRef(0);

  useEffect(() => {
    // Reduce floating particles for performance
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 4 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);

    // Reduce floating hearts
    const hearts = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 25 + Math.random() * 20,
      duration: 10 + Math.random() * 3,
      delay: Math.random() * 4,
    }));
    setFloatingHearts(hearts);

    // Reduce sparkles
    const newSparkles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 4 + Math.random() * 4,
      delay: Math.random() * 3,
    }));
    setSparkles(newSparkles);

    // Reduce falling ribbons
    const colors = ['#C62828', '#D4AF37', '#FCE4EC', '#FF69B4'];
    const newRibbons = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: `${10 + i * 15}%`,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
    }));
    setRibbons(newRibbons);
  }, []);

  // Mouse move handler for heart trail - throttled for performance
  useEffect(() => {
    const colors = ['#C62828', '#FF69B4', '#D4AF37', '#FCE4EC'];
    let lastTime = 0;
    const throttleDelay = 100; // Only create hearts every 100ms
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < throttleDelay) return;
      lastTime = now;

      const newHeart: MouseHeart = {
        id: heartIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        size: 15 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setMouseHearts(prev => [...prev.slice(-10), newHeart]); // Keep only last 10 hearts

      // Remove heart after animation
      setTimeout(() => {
        setMouseHearts(prev => prev.filter(h => h.id !== newHeart.id));
      }, 1500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    
    tl.to(sealRef.current, { scale: 0.8, duration: 0.2 })
      .to(flapRef.current, { rotateX: 180, duration: 0.8, ease: 'power2.inOut' })
      .to(letterRef.current, { y: -100, opacity: 1, duration: 1, ease: 'power2.out' }, '-=0.4')
      .to(envelopeRef.current, { scale: 1.1, duration: 0.3 })
      .to({}, { duration: 0.5, onComplete: onEnvelopeOpen });
  }, [onEnvelopeOpen]);

  const handleEnvelopeClick = () => {
    const tl = gsap.timeline();
    tl.to(sealRef.current, { scale: 0, rotation: 360, duration: 0.5 })
      .to(flapRef.current, { rotateX: 180, duration: 0.8, ease: 'power2.inOut' })
      .to(letterRef.current, { y: -200, opacity: 1, duration: 1, ease: 'power2.out' }, '-=0.4')
      .to(envelopeRef.current, { scale: 0.8, opacity: 0, duration: 0.5 })
      .to({}, { duration: 0.3, onComplete: onEnvelopeOpen });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-soft-pink via-cream to-white">
      {/* Custom Heart Cursor Trail */}
      {mouseHearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="fixed pointer-events-none handwritten z-50"
          style={{
            left: heart.x - heart.size / 2,
            top: heart.y - heart.size / 2,
            fontSize: `${heart.size}px`,
            color: heart.color,
          }}
          initial={{ scale: 0, opacity: 1, rotate: 0 }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [1, 0.8, 0],
            rotate: [0, 180],
            y: [0, -50],
          }}
          transition={{
            duration: 1.5,
            ease: 'easeOut',
          }}
        >
          ♥
        </motion.div>
      ))}

      {/* Floating Hearts */}
      {floatingHearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute handwritten text-primary-red"
          style={{
            left: heart.left,
            fontSize: `${heart.size}px`,
            bottom: -50,
          }}
          animate={{
            y: [-50, -window.innerHeight - 100],
            x: [0, Math.sin(heart.id) * 50],
            rotate: [0, 360],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear',
          }}
        >
          ♥
        </motion.div>
      ))}

      {/* Floating sparkle hearts */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute text-lg"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            color: ['#D4AF37', '#FFD700', '#FF69B4'][Math.floor(Math.random() * 3)],
            filter: 'drop-shadow(0 0 4px currentColor)',
          }}
          animate={{
            scale: [0, 1.2, 0],
            rotate: [0, 180],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: 'easeInOut',
          }}
        >
          ♥
        </motion.div>
      ))}

      {/* Falling Hearts instead of Ribbons */}
      {ribbons.map((ribbon) => (
        <motion.div
          key={ribbon.id}
          className="absolute top-0 text-4xl"
          style={{
            left: ribbon.left,
            color: ribbon.color,
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
          }}
          animate={{
            y: [-100, window.innerHeight + 100],
            rotate: [ribbon.rotation, ribbon.rotation + 720],
            x: [0, Math.sin(ribbon.id) * 100],
            opacity: [0, 1, 1, 0.5],
          }}
          transition={{
            duration: 10 + ribbon.id,
            repeat: Infinity,
            delay: ribbon.delay,
            ease: 'easeInOut',
          }}
        >
          ♥
        </motion.div>
      ))}

      {/* Floating Bubbles as small hearts */}
      {particles.map((particle) => (
        <motion.div
          key={`bubble-${particle.id}`}
          className="absolute text-xl opacity-20"
          style={{
            left: particle.left,
            top: particle.top,
            color: '#C62828',
          }}
          animate={{
            y: [0, -40, 0],
            scale: [1, 1.4, 1],
            opacity: [0.15, 0.35, 0.15],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: particle.duration + 1,
            repeat: Infinity,
            delay: particle.delay + 0.5,
            ease: 'easeInOut',
          }}
        >
          ♥
        </motion.div>
      ))}

      {/* Gentle rotating stars */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute text-4xl"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <span className="text-gold">✨</span>
        </motion.div>
      ))}

      <div className="relative z-10 text-center">
        <motion.h1
          className="elegant text-4xl md:text-6xl mb-12 text-primary-red"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          A Special Birthday Surprise
        </motion.h1>

        {/* Envelope */}
        <motion.div
          ref={envelopeRef}
          className="relative w-80 h-52 mx-auto cursor-pointer"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5, type: 'spring' }}
          whileHover={{ scale: 1.05, y: -10 }}
          onClick={handleEnvelopeClick}
          style={{ perspective: '1000px' }}
        >
          {/* Envelope body */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-red to-primary-dark-red shadow-2xl" 
               style={{ clipPath: 'polygon(0 20%, 50% 60%, 100% 20%, 100% 100%, 0 100%)' }}>
          </div>

          {/* Envelope flap */}
          <div
            ref={flapRef}
            className="absolute top-0 left-0 w-full h-32 bg-primary-dark-red origin-top"
            style={{
              clipPath: 'polygon(0 0, 50% 80%, 100% 0)',
              transformStyle: 'preserve-3d',
            }}
          />

          {/* Wax seal */}
          <motion.div
            ref={sealRef}
            className="absolute top-16 left-1/2 -translate-x-1/2 w-16 h-16 bg-gold rounded-full flex items-center justify-center shadow-lg animate-pulse-glow z-10"
            whileHover={{ scale: 1.2, rotate: 10 }}
          >
            <div className="text-white elegant text-2xl font-bold">S</div>
          </motion.div>

          {/* Letter inside */}
          <div
            ref={letterRef}
            className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-40 bg-cream shadow-xl opacity-0"
            style={{ zIndex: -1 }}
          >
            <div className="p-6 handwritten text-primary-red text-center">
              <p className="text-xl">Your memories await...</p>
            </div>
          </div>
        </motion.div>

        <motion.p
          className="mt-8 text-gray-600 poppins"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Click the seal to begin
        </motion.p>
      </div>
    </section>
  );
}
