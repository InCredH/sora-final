import React from 'react';
import { Star } from 'lucide-react';

export const StarRating: React.FC<{ rating: number; size?: number; className?: string }> = ({
  rating,
  size = 12,
  className = '',
}) => (
  <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`Rated ${rating} out of 5`} role="img">
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        size={size}
        strokeWidth={1.5}
        className={n <= Math.round(rating) ? 'fill-[#C8A96B] text-[#C8A96B]' : 'text-[#C8A96B]/40'}
      />
    ))}
  </span>
);
