'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CelebrationSection() {
  const [isLit, setIsLit] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; color: string; duration: number; delay: number; rotation: number }>>([]);
  const [sparkParticles, setSparkParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    // Generate floating spark particles around candle
    const sparks = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.cos((i * 45 * Math.PI) / 180) * 40,
      y: Math.sin((i * 45 * Math.PI) / 180) * 40,
    }));
    setSparkParticles(sparks);
  }, []);

  const handleBlowCandle = () => {
    // Trigger blow animation sequence
    setIsLit(false);
    
    // Generate confetti explosion after blow
    setTimeout(() => {
      const confettiArray = Array.from({ length: 150 }, (_, i) => ({
        id: i,
        x: 50 + (Math.random() - 0.5) * 30,
        y: 40,
        color: ['#D4AF37', '#FFB347', '#F8D7DA', '#FFF8E7', '#C62828'][Math.floor(Math.random() * 5)],
        duration: 2 + Math.random() * 2,
        delay: Math.random() * 0.5,
        rotation: Math.random() * 360,
      }));
      setConfetti(confettiArray);
      setShowCelebration(true);
    }, 1500);
  };

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-1000 ${
      isLit 
        ? 'bg-gradient-to-b from-amber-50 via-cream to-soft-pink' 
        : 'bg-gradient-to-b from-gray-800 via-gray-900 to-black'
    }`}>
      {/* Floating background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`bg-particle-${i}`}
            className="absolute w-1 h-1 bg-gold rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Confetti Explosion */}
      <AnimatePresence>
        {showCelebration && confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute w-3 h-3 rounded-sm"
            style={{
              left: `${piece.x}%`,
              top: `${piece.y}%`,
              backgroundColor: piece.color,
            }}
            initial={{ scale: 0, y: 0, rotate: 0 }}
            animate={{
              y: [0, typeof window !== 'undefined' ? window.innerHeight : 1000],
              x: [(Math.random() - 0.5) * 400],
              rotate: [piece.rotation, piece.rotation + 360 * 3],
              opacity: [1, 1, 0],
              scale: [0, 1, 0.5],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: 'easeOut',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Rising Balloons - only show after celebration */}
      <AnimatePresence>
        {showCelebration && [...Array(12)].map((_, i) => {
          const randomX = (Math.random() * 40 - 20);
          const randomDuration = 4 + Math.random() * 2;
          return (
            <motion.div
              key={`balloon-${i}`}
              className="absolute bottom-0 pointer-events-none"
              style={{
                left: `${5 + i * 8}%`,
              }}
              initial={{ y: 100, opacity: 0 }}
              animate={{
                y: typeof window !== 'undefined' ? -window.innerHeight - 200 : -1000,
                x: [0, randomX, randomX * 1.5],
                opacity: [0, 1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: randomDuration,
                delay: 1 + i * 0.15,
                ease: 'easeOut',
              }}
            >
              <div 
                className="w-12 h-16 md:w-16 md:h-20 rounded-full shadow-2xl"
                style={{
                  backgroundColor: ['#D4AF37', '#FFB347', '#F8D7DA', '#FFF8E7', '#FF69B4', '#C62828'][i % 6],
                }}
              />
              <div className="w-0.5 h-24 bg-gray-400 mx-auto opacity-50" />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Fireworks - only show after celebration */}
      <AnimatePresence>
        {showCelebration && [...Array(6)].map((_, i) => (
          <motion.div
            key={`firework-${i}`}
            className="absolute pointer-events-none"
            style={{
              left: `${15 + i * 14}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(16)].map((_, j) => (
              <motion.div
                key={j}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ['#D4AF37', '#FFB347', '#F8D7DA', '#C62828'][j % 4],
                }}
                initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.5, 0],
                  x: Math.cos((j * 22.5 * Math.PI) / 180) * (80 + Math.random() * 40),
                  y: Math.sin((j * 22.5 * Math.PI) / 180) * (80 + Math.random() * 40),
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: 1.5 + i * 0.3,
                  ease: 'easeOut',
                }}
              />
            ))}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Content - Luxury Birthday Cake */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="mb-28 md:mb-32"
        >
          <h1 className={`elegant text-5xl md:text-7xl lg:text-8xl mb-4 drop-shadow-2xl transition-colors duration-1000 ${
            isLit ? 'text-primary-red' : 'text-white'
          }`}>
            Happy Birthday!
          </h1>
          <motion.p 
            className={`handwritten text-2xl md:text-3xl lg:text-4xl transition-colors duration-1000 ${
              isLit ? 'text-gray-700' : 'text-cream'
            }`}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Make a wish, Joshya! ✨
          </motion.p>
        </motion.div>

        {/* Luxury 3D Birthday Cake */}
        <motion.div
          initial={{ scale: 0, y: 100, opacity: 0, rotateY: -180 }}
          animate={{ scale: 1, y: 0, opacity: 1, rotateY: 0 }}
          transition={{ duration: 1.2, type: 'spring', stiffness: 80, damping: 12 }}
          className="relative mb-16"
        >
          {/* Cake Container with 3D perspective */}
          <div className="relative inline-block" style={{ perspective: '1000px' }}>
            {/* Glow effect around cake when lit */}
            {isLit && (
              <motion.div
                className="absolute inset-0 rounded-full blur-3xl opacity-40"
                style={{
                  background: 'radial-gradient(circle, #FFB347 0%, transparent 70%)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}

            {/* 3D Luxury Cake Structure - Properly oriented */}
            <div className="relative flex flex-col items-center">
              {/* Top Layer (smallest) - with candle on top */}
              <motion.div
                className="relative w-40 h-16 md:w-48 md:h-20 bg-gradient-to-b from-white via-cream to-white rounded-lg shadow-lg mb-2 z-30"
                style={{
                  boxShadow: isLit 
                    ? '0 10px 30px rgba(0,0,0,0.2), inset 0 2px 6px rgba(255,255,255,0.5)'
                    : '0 10px 30px rgba(0,0,0,0.6), inset 0 2px 6px rgba(255,255,255,0.3)',
                }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              >
                <div className="absolute inset-0 border-2 border-gold border-opacity-20 rounded-lg" />
                {/* Icing drips */}
                <div className="absolute -bottom-2 left-0 right-0 flex justify-around">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-6 h-3 bg-white rounded-b-full opacity-80"
                      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    />
                  ))}
                </div>
                {/* Gold decorative swirls */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-gold text-xs">◈</div>
                <div className="absolute top-2 left-2 text-sm">🎀</div>
                <div className="absolute top-2 right-2 text-sm">🎀</div>
              </motion.div>

              {/* Middle Layer */}
              <motion.div
                className="relative w-52 h-20 md:w-64 md:h-24 bg-gradient-to-b from-cream via-white to-cream rounded-lg shadow-xl mb-2 z-20"
                style={{
                  boxShadow: isLit 
                    ? '0 15px 40px rgba(0,0,0,0.25), inset 0 2px 8px rgba(255,255,255,0.5)'
                    : '0 15px 40px rgba(0,0,0,0.7), inset 0 2px 8px rgba(255,255,255,0.3)',
                }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
              >
                <div className="absolute inset-0 border-4 border-gold border-opacity-20 rounded-lg" />
                {/* Icing drips */}
                <div className="absolute -bottom-2 left-0 right-0 flex justify-around">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="w-7 h-3 bg-soft-pink rounded-b-full opacity-70"
                    />
                  ))}
                </div>
                <div className="absolute top-2 right-3 text-xl">🌸</div>
                <div className="absolute top-2 left-3 text-xl">🌸</div>
              </motion.div>

              {/* Bottom Layer (largest) */}
              <motion.div
                className="relative w-64 h-24 md:w-80 md:h-28 bg-gradient-to-b from-white via-cream to-soft-pink rounded-lg shadow-2xl z-10"
                style={{
                  boxShadow: isLit 
                    ? '0 20px 60px rgba(0,0,0,0.3), inset 0 2px 10px rgba(255,255,255,0.5)'
                    : '0 20px 60px rgba(0,0,0,0.8), inset 0 2px 10px rgba(255,255,255,0.3)',
                }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Gold decorative border */}
                <div className="absolute inset-0 border-4 border-gold border-opacity-30 rounded-lg" />
                {/* Icing drips */}
                <div className="absolute -bottom-2 left-0 right-0 flex justify-around">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-4 bg-white rounded-b-full opacity-80"
                      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    />
                  ))}
                </div>
                {/* Decorative roses */}
                <div className="absolute top-3 left-4 text-2xl">🌹</div>
                <div className="absolute top-3 right-4 text-2xl">🌹</div>
                <div className="absolute top-3 left-1/2 -translate-x-1/2 text-xl">🍫</div>
              </motion.div>

              {/* Large Candle on Top */}
              <motion.div
                className="absolute -top-16 md:-top-20 left-1/2 -translate-x-1/2 z-40"
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 0.8, type: 'spring' }}
              >
                {/* Candle stick */}
                <motion.div
                  className="relative w-5 h-12 md:w-7 md:h-16 mx-auto bg-gradient-to-b from-pink-300 via-purple-300 to-pink-400 rounded-t-lg shadow-lg"
                  style={{
                    boxShadow: '0 5px 15px rgba(0,0,0,0.3), inset 0 2px 5px rgba(255,255,255,0.5)',
                  }}
                  animate={isLit ? {} : {
                    filter: ['brightness(1)', 'brightness(0.5)'],
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Gold spiral decoration on candle */}
                  <div className="absolute inset-0 flex flex-col justify-around py-2">
                    <div className="w-full h-0.5 bg-gold opacity-40" />
                    <div className="w-full h-0.5 bg-gold opacity-40" />
                    <div className="w-full h-0.5 bg-gold opacity-40" />
                  </div>
                  
                  {/* Wick */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-gray-800" />
                </motion.div>

                {/* Realistic Flickering Flame */}
                <AnimatePresence>
                  {isLit && (
                    <motion.div
                      className="absolute -top-6 md:-top-7 left-1/2 -translate-x-1/2"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{
                        scale: [1, 0.3, 0],
                        opacity: [1, 0.5, 0],
                        y: [0, 5],
                      }}
                      transition={{ exit: { duration: 0.6 } }}
                    >
                      {/* Glow effect */}
                      <motion.div
                        className="absolute inset-0 blur-lg opacity-60"
                        style={{
                          width: '40px',
                          height: '40px',
                          marginLeft: '-8px',
                          marginTop: '-8px',
                          background: 'radial-gradient(circle, #FFB347 0%, #FF8C00 50%, transparent 70%)',
                        }}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.6, 0.8, 0.6],
                        }}
                        transition={{ duration: 0.4, repeat: Infinity }}
                      />
                      
                      {/* Flame */}
                      <motion.div
                        className="relative text-2xl md:text-3xl filter drop-shadow-lg"
                        animate={{
                          scale: [1, 1.1, 0.95, 1.05, 1],
                          y: [0, -3, 0, -2, 0],
                          rotate: [0, -2, 2, -1, 0],
                        }}
                        transition={{
                          duration: 0.3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        🔥
                      </motion.div>

                      {/* Floating spark particles around flame */}
                      {sparkParticles.map((spark) => (
                        <motion.div
                          key={spark.id}
                          className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-yellow-400 rounded-full"
                          style={{
                            boxShadow: '0 0 4px #FFB347',
                          }}
                          animate={{
                            x: [0, spark.x * 0.5, spark.x * 0.8],
                            y: [0, spark.y * 0.5, spark.y * 0.8],
                            opacity: [1, 0.7, 0],
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: spark.id * 0.15,
                            ease: 'easeOut',
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Smoke after blowing */}
                <AnimatePresence>
                  {!isLit && (
                    <motion.div
                      className="absolute -top-10 left-1/2 -translate-x-1/2"
                      initial={{ opacity: 0, scale: 0.5, y: 0 }}
                      animate={{
                        opacity: [1, 0.7, 0],
                        scale: [0.5, 1.5, 2],
                        y: [0, -40, -80],
                        x: [0, Math.sin(Date.now()) * 10],
                      }}
                      transition={{ duration: 2, ease: 'easeOut' }}
                    >
                      <div className="text-4xl">💨</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Sparkles around cake when lit */}
              {isLit && (
                <>
                  {[...Array(12)].map((_, i) => {
                    const angle = (i * 30 * Math.PI) / 180;
                    const radius = 140;
                    return (
                      <motion.div
                        key={`sparkle-${i}`}
                        className="absolute text-xl md:text-2xl pointer-events-none"
                        style={{
                          left: '50%',
                          top: '50%',
                          x: Math.cos(angle) * radius,
                          y: Math.sin(angle) * radius,
                        }}
                        animate={{
                          scale: [0, 1.5, 0],
                          rotate: [0, 180, 360],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.15,
                          ease: 'easeInOut',
                        }}
                      >
                        ✨
                      </motion.div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Glassmorphism Blow Button */}
        {isLit && (
          <motion.button
            onClick={handleBlowCandle}
            className="relative px-10 py-5 md:px-14 md:py-6 text-xl md:text-2xl font-bold text-white rounded-full overflow-hidden backdrop-blur-md bg-white/10 border-2 border-white/30 shadow-2xl"
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 150 }}
            whileHover={{ 
              scale: 1.08, 
              boxShadow: '0 0 40px rgba(255,179,71,0.6)',
              borderColor: 'rgba(255,179,71,0.6)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 opacity-70" />
            
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            
            <span className="relative z-10 flex items-center gap-3 handwritten">
              <motion.span
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                🎂
              </motion.span>
              Blow the Candle
              <motion.span
                animate={{ x: [0, 5, 0], scale: [1, 1.3, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                💨
              </motion.span>
            </span>
          </motion.button>
        )}

        {/* Celebration Message */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -180, y: 50 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 120 }}
              className="mt-16"
            >
              <motion.h2
                className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl handwritten mb-6"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎉 Wish Granted! 🎉
              </motion.h2>
              
              <motion.p
                className="text-2xl md:text-4xl text-white poppins drop-shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                May all your dreams come true, Joshya! ✨💫
              </motion.p>

              <motion.p
                className="text-xl md:text-2xl text-cream mt-4 elegant"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                Here's to another amazing year ahead! 🎊
              </motion.p>

              {/* Extra floating hearts celebration */}
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={`celebrate-heart-${i}`}
                  className="absolute text-3xl md:text-5xl pointer-events-none"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${50 + Math.random() * 30}%`,
                  }}
                  initial={{ scale: 0, y: 0, rotate: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.5, 1, 0],
                    y: [-50, -200],
                    rotate: [0, Math.random() * 360],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    delay: 1 + i * 0.08,
                    ease: 'easeOut',
                  }}
                >
                  {['💖', '💕', '💗', '💝', '❤️'][i % 5]}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
