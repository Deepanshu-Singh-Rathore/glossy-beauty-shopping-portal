import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const announcements = [
  { text: '✨ Free Express Shipping on all orders above ₹799 | Code: FREESHIP', link: '/products' },
  { text: '🌸 Festive Glow Sale: Flat 20% OFF sitewide with coupon GLOW20', link: '/products' },
  { text: '🌿 100% Dermatologically Tested, Cruelty-Free & Clean Beauty', link: '/about' },
  { text: '🤖 Try our AI Routine Builder for custom personalized beauty steps', link: '/routine-builder' }
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const current = announcements[currentIndex];

  return (
    <aside aria-label="Promotional announcements" className="announcement-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <Link
          to={current.link}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#FFFFFF',
            textDecoration: 'none',
            fontSize: '0.8rem',
            fontWeight: 600
          }}
        >
          <span>{current.text}</span>
          <ChevronRight size={14} />
        </Link>
        <button
          onClick={() => setIsVisible(false)}
          style={{
            position: 'absolute',
            right: '0',
            color: 'rgba(255,255,255,0.8)',
            display: 'flex',
            alignItems: 'center',
            padding: '2px',
            borderRadius: '50%'
          }}
          aria-label="Close announcement bar"
        >
          <X size={14} />
        </button>
      </div>
    </aside>
  );
}
