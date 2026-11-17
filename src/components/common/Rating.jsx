import React from 'react';
import { Star } from 'lucide-react';

export default function Rating({ rating = 0, reviewsCount, size = 15, showCount = true }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#F59E0B' }}>
        {[...Array(5)].map((_, index) => {
          const isFilled = index < fullStars;
          const isHalf = index === fullStars && hasHalfStar;
          return (
            <Star
              key={index}
              size={size}
              fill={isFilled || isHalf ? '#F59E0B' : 'transparent'}
              stroke="#F59E0B"
              strokeWidth={1.8}
              style={{ opacity: isFilled || isHalf ? 1 : 0.35 }}
            />
          );
        })}
      </div>
      <span style={{ fontSize: `${size * 0.85}px`, fontWeight: 700, color: '#374151', marginLeft: '2px' }}>
        {Number(rating).toFixed(1)}
      </span>
      {showCount && reviewsCount !== undefined && (
        <span style={{ fontSize: `${size * 0.78}px`, color: '#6B7280', marginLeft: '2px' }}>
          ({reviewsCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
