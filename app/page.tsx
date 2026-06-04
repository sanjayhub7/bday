'use client';

import { useState } from 'react';
import BirthdayHero from '@/components/BirthdayHero';
import BirthdayReveal from '@/components/BirthdayReveal';
import MemoryGallery from '@/components/MemoryGallery';
import TimelineSection from '@/components/TimelineSection';
import ScrapbookPage from '@/components/ScrapbookPage';
import MessageSectionNew from '@/components/MessageSectionNew';
import CelebrationSection from '@/components/CelebrationSection';
import MusicController from '@/components/MusicController';

export default function Home() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  return (
    <main className="relative">
      <MusicController />
      
      {!envelopeOpened ? (
        <BirthdayHero onEnvelopeOpen={() => setEnvelopeOpened(true)} />
      ) : (
        <>
          <BirthdayReveal />
          <MemoryGallery />
          <TimelineSection />
          <ScrapbookPage />
          <MessageSectionNew />
          <CelebrationSection />
        </>
      )}
    </main>
  );
}
