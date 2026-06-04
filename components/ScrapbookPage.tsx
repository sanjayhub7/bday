'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import StickerDecoration from './StickerDecoration';

export default function ScrapbookPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 2;

  const pages = [
    {
      title: 'Favorite Moments',
      notes: [
        'The first hug with you 🤗',
        'Bike ride with you 🚴‍♀️',
        'The moment when we kissed 💋',
        'Eating together 🍽️',
        'Eye contact 👀💕',
      ],
    },
    {
      title: 'Why You\'re Amazing',
      notes: [
        'Your kindness lights up every room',
        'You make ordinary days extraordinary',
        'The world is better with you in it',
      ],
    },
  ];

  const flipPage = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="min-h-screen py-20 px-4 bg-cream paper-texture flex items-center justify-center relative overflow-hidden">
      {/* Notebook rings */}
      <div className="absolute left-8 top-0 bottom-0 flex flex-col justify-around">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-8 h-8 rounded-full bg-gray-400 shadow-inner" />
        ))}
      </div>

      <div className="max-w-4xl w-full relative">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="elegant text-5xl text-center text-primary-red mb-12"
        >
          Scrapbook of Us
        </motion.h2>

        {/* Book */}
        <div className="relative">
          <motion.div
            key={currentPage}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-2xl p-12 rounded-lg min-h-[500px] relative"
            style={{ 
              backgroundImage: 'linear-gradient(rgba(255, 248, 231, 0.3) 1px, transparent 1px)',
              backgroundSize: '100% 30px',
            }}
          >
            {/* Torn edge effect */}
            <div className="absolute -right-2 top-0 bottom-0 w-4 bg-white" 
                 style={{ 
                   clipPath: 'polygon(0 0, 100% 2%, 0 5%, 100% 8%, 0 11%, 100% 14%, 0 17%, 100% 20%, 0 23%, 100% 26%, 0 29%, 100% 32%, 0 35%, 100% 38%, 0 41%, 100% 44%, 0 47%, 100% 50%, 0 53%, 100% 56%, 0 59%, 100% 62%, 0 65%, 100% 68%, 0 71%, 100% 74%, 0 77%, 100% 80%, 0 83%, 100% 86%, 0 89%, 100% 92%, 0 95%, 100% 98%)' 
                 }} 
            />

            {/* Page content */}
            <h3 className="handwritten text-4xl text-primary-red mb-8 relative">
              {pages[currentPage].title}
              <motion.div
                className="absolute -right-4 -top-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <StickerDecoration type="heart" />
              </motion.div>
            </h3>

            <div className="space-y-6">
              {pages[currentPage].notes.map((note, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative pl-8"
                >
                  {/* Bullet point */}
                  <div className="absolute left-0 top-2 w-4 h-4 bg-primary-red rounded-full" />
                  
                  <p className="handwritten text-2xl text-gray-700 leading-relaxed">
                    {note}
                  </p>

                  {/* Random stickers */}
                  {index === 1 && (
                    <div className="absolute -right-8 -top-4">
                      <StickerDecoration type="star" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Washi tape decoration */}
            <div className="absolute bottom-8 left-8 w-32 h-8 bg-soft-pink opacity-50 rotate-3" />
            <div className="absolute top-12 right-12 w-24 h-6 bg-gold opacity-30 -rotate-6" />

            {/* Page number */}
            <div className="absolute bottom-4 right-8 poppins text-gray-400 text-sm">
              Page {currentPage + 1} of {totalPages}
            </div>
          </motion.div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => flipPage('prev')}
              disabled={currentPage === 0}
              className={`px-6 py-3 rounded-full elegant text-lg ${
                currentPage === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-red text-white hover:bg-primary-dark-red'
              } transition-colors`}
            >
              ← Previous
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => flipPage('next')}
              disabled={currentPage === totalPages - 1}
              className={`px-6 py-3 rounded-full elegant text-lg ${
                currentPage === totalPages - 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-red text-white hover:bg-primary-dark-red'
              } transition-colors`}
            >
              Next →
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
