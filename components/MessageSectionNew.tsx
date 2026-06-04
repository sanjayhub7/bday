'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const MESSAGE_TEXT = `Happy Birthday my love 💗😘

The day my princess born came 🌹 thanks for coming in my life my dear you have gave me the meaning of my life 🥹

I never thought I could love a girl this much 🫠 you are one who took my soul and made me feel in love and now I can't normal without talking with you 🥰🥹

I don't how to express this feeling to you that how much I love 🫠💋💘

Every time when I think about my future you are one of the main part in it 💞🫂 I have imagined marrying you, going trips with you, creating family with you and till our last 🥹🥰🤌

I have made this web at last min so apdi epdi nu irukum etho yenala mudujadhu do you like it bae 😚

Thank you for being caring🫠, understanding😘, supportive🫂, and wonderfully yourself💗. Thank you for all the memories we've created together and for every moment that still awaits us😍🫠😘

No matter how many birthdays come and go, my love for you will continue to grow stronger 💪 ❤️ 🥰

Love you forever ♾️ 💘

Miss you my girl 🥺 I could like to spend time with you on this day but 😭`;

export default function MessageSectionNew() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < MESSAGE_TEXT.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + MESSAGE_TEXT[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  return (
    <section className="min-h-screen py-20 px-4 bg-cream relative overflow-hidden flex items-center justify-center">
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white p-12 rounded-lg shadow-2xl relative"
        >
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-gold" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-gold" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-gold" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-gold" />

          <h2 className="elegant text-4xl md:text-5xl text-center text-primary-red mb-8">
            A Message From The Heart 💝
          </h2>

          <div className="handwritten text-xl md:text-2xl text-gray-700 leading-relaxed whitespace-pre-line">
            {displayedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-1 h-6 bg-primary-red ml-1"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
