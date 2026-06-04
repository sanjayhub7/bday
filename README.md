# 🎂 Premium Birthday Memory Website

A luxury interactive birthday card experience built with Next.js, React, Tailwind CSS, Framer Motion, and GSAP.

## ✨ Features

- **Envelope Animation**: 3D envelope opening with realistic animations
- **Memory Gallery**: Polaroid-style photos with drag-and-drop interactions
- **Timeline Section**: Horizontal scrolling timeline of memories
- **Interactive Scrapbook**: Notebook-style pages with flip animations
- **Typewriter Message**: Animated birthday message with floating particles
- **Celebration Screen**: Confetti, balloons, fireworks, and gift box animations
- **Music Controller**: Background music toggle
- **Responsive Design**: Works beautifully on all devices

## 🎨 Design Style

- Modern scrapbook aesthetic
- Red, cream, white, and soft pink color palette
- Paper texture backgrounds
- Polaroid photo frames with washi tape decorations
- Handwritten and elegant serif typography
- Smooth cinematic animations
- Romantic and emotional storytelling

## 🚀 Installation

1. **Install Node.js** (if not already installed):
   - Download from [nodejs.org](https://nodejs.org/)
   - Choose the LTS (Long Term Support) version
   - Verify installation: `node --version` and `npm --version`

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Open Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready animations
- **GSAP** - Professional-grade animation library

## 🎯 Components

- `BirthdayHero` - Landing screen with envelope animation
- `MemoryGallery` - Polaroid photo gallery
- `TimelineSection` - Horizontal timeline with parallax
- `ScrapbookPage` - Interactive notebook pages
- `MessageSection` - Typewriter birthday message
- `CelebrationSection` - Final celebration with effects
- `MusicController` - Background music toggle
- `PhotoCard` - Individual polaroid photo component
- `StickerDecoration` - Decorative sticker elements

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to change the color palette:
```typescript
colors: {
  primary: {
    red: '#C62828',
    'dark-red': '#8E0000',
  },
  cream: '#FFF8E7',
  'soft-pink': '#FCE4EC',
  gold: '#D4AF37',
}
```

### Fonts
The project uses Google Fonts:
- Playfair Display (elegant serif)
- Dancing Script (handwritten)
- Poppins (sans-serif)

### Content
- Update memories in `components/MemoryGallery.tsx`
- Modify timeline events in `components/TimelineSection.tsx`
- Edit birthday message in `components/MessageSection.tsx`
- Customize scrapbook notes in `components/ScrapbookPage.tsx`

## 📝 Adding Photos

1. Create a `public` folder in the root directory
2. Add subfolders: `memories`, `timeline`
3. Place your images with matching filenames
4. Update image paths in components

## 🌟 Performance Tips

- Optimize images before adding them
- Use WebP format for better compression
- Enable Next.js Image optimization
- Lazy load components for better initial load

## 🎁 Deployment

Deploy to Vercel (recommended):

```bash
npm run build
```

Then deploy using:
- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [GitHub Pages](https://pages.github.com)

## 📄 License

This project is open source and available for personal use.

## 💝 Credits

Created with love for special birthday celebrations!

---

Made with ❤️ using React, Next.js, Framer Motion & GSAP
"# bday" 
