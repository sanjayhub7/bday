'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function TimelineSection() {
  const [noClickCount, setNoClickCount] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleNoClick = () => {
    if (noClickCount < 3) {
      setNoClickCount(noClickCount + 1);
    }
  };

  const handleYesClick = () => {
    setShowAnimation(true);
  };

  // Calculate "No" button position to run away
  const getNoButtonStyle = () => {
    if (noClickCount === 0) return {};
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 200 - 100;
    return {
      transform: `translate(${randomX}px, ${randomY}px)`,
      transition: 'transform 0.3s ease',
    };
  };

  // Calculate "Yes" button size
  const getYesButtonScale = () => {
    return 1 + noClickCount * 0.5; // Grows 50% larger each time
  };

  if (showAnimation) {
    return (
      <section className="relative min-h-screen py-20 px-4 bg-gradient-to-br from-pink-100 via-purple-50 to-blue-50 overflow-hidden flex items-center justify-center">
        {/* Celebration background */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              {['♥', '💕', '✨', '💖', '🌟'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>

        {/* Dancing Teddy Bears */}
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <motion.h2
              className="elegant text-6xl md:text-7xl font-bold mb-4"
              style={{
                background: 'linear-gradient(135deg, #E91E63, #9C27B0, #FF69B4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              Yay! I knew it! 💕
            </motion.h2>
          </motion.div>

          {/* Dancing Teddy Bears */}
          <div className="flex items-end justify-center gap-8 relative">
            {/* Male Teddy Bear */}
            <motion.div
              className="text-9xl relative"
              animate={{
                y: [0, -20, 0],
                rotate: [-5, 5, -5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              🧸
              {/* Hat for male teddy */}
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2 text-5xl"
                animate={{
                  rotate: [-10, 10, -10],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              >
                🎩
              </motion.div>
            </motion.div>

            {/* Heart between them */}
            <motion.div
              className="text-7xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            >
              💕
            </motion.div>

            {/* Female Teddy Bear */}
            <motion.div
              className="text-9xl relative"
              animate={{
                y: [0, -20, 0],
                rotate: [5, -5, 5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.2,
              }}
            >
              🧸
              {/* Bow for female teddy */}
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2 text-5xl"
                animate={{
                  rotate: [10, -10, 10],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              >
                🎀
              </motion.div>
            </motion.div>
          </div>

          {/* Musical notes */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`note-${i}`}
              className="absolute text-4xl"
              style={{
                left: `${20 + i * 10}%`,
                top: `${30 + (i % 2) * 20}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0, 1, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              {i % 2 === 0 ? '🎵' : '🎶'}
            </motion.div>
          ))}

          {/* Love message */}
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-center mt-16 handwritten text-4xl text-pink-600"
          >
            Forever and always! 💖
          </motion.p>
        </div>

        {/* Confetti */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`confetti-${i}`}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: -20,
              backgroundColor: ['#E91E63', '#9C27B0', '#FF69B4', '#FFD700', '#00BCD4'][i % 5],
            }}
            animate={{
              y: [0, window.innerHeight + 100],
              rotate: [0, 360 * 3],
              opacity: [1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </section>
    );
  }

  return (
    <section className="relative min-h-screen py-20 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden flex items-center justify-center">
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="elegant text-6xl md:text-7xl font-bold mb-16"
          style={{
            background: 'linear-gradient(135deg, #E91E63 0%, #9C27B0 50%, #FF69B4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 4px 20px rgba(156, 39, 176, 0.3))',
          }}
        >
          Will You Love Me?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="handwritten text-3xl text-gray-700 mb-16"
        >
          Choose wisely... 💕
        </motion.p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-8 relative min-h-[200px]">
          {/* Yes Button - grows larger each time No is clicked */}
          <motion.button
            onClick={handleYesClick}
            className="elegant font-bold text-white px-12 py-6 rounded-full shadow-2xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #E91E63, #FF69B4)',
              scale: getYesButtonScale(),
            }}
            whileHover={{ scale: getYesButtonScale() * 1.1 }}
            whileTap={{ scale: getYesButtonScale() * 0.95 }}
            animate={{
              boxShadow: [
                '0 10px 40px rgba(233, 30, 99, 0.5)',
                '0 10px 60px rgba(233, 30, 99, 0.8)',
                '0 10px 40px rgba(233, 30, 99, 0.5)',
              ],
            }}
            transition={{
              boxShadow: { duration: 2, repeat: Infinity },
            }}
          >
            <span className="text-2xl relative z-10">Yes! 💖</span>
            
            {/* Sparkle effect */}
            <motion.div
              className="absolute inset-0"
              animate={{
                rotate: [0, 360],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    top: i < 2 ? '10%' : '90%',
                    left: i % 2 === 0 ? '10%' : '90%',
                  }}
                />
              ))}
            </motion.div>
          </motion.button>

          {/* No Button - moves around and disappears after 3 clicks */}
          <AnimatePresence>
            {noClickCount < 3 && (
              <motion.button
                onClick={handleNoClick}
                className="elegant font-bold text-white px-12 py-6 rounded-full shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #9C27B0, #7C3AED)',
                  ...getNoButtonStyle(),
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-2xl">No 😢</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Hint text */}
        {noClickCount > 0 && noClickCount < 3 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 handwritten text-2xl text-pink-500"
          >
            {noClickCount === 1 && "Are you sure? 🥺"}
            {noClickCount === 2 && "Please? 🥹"}
          </motion.p>
        )}

        {noClickCount === 3 && (
          <motion.p
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 handwritten text-3xl text-pink-600"
          >
            You know there's only one right answer! 💝
          </motion.p>
        )}
      </div>
    </section>
  );
}
