// components/StarRating.js

import { useState } from 'react';

interface StarRatingProps {
  maxStars?: number;
  onRate: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ maxStars = 5, onRate }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const handleMouseEnter = (index: number) => {
    setHoveredRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleClick = (index: number) => {
    setRating(index + 1);
    if (onRate) {
      onRate(index + 1);
    }
  };

  const getEmojiOrWord = (rating: number) => {
    switch (rating) {
      case 1:
        return '😞 Poor';
      case 2:
        return '😐 Fair';
      case 3:
        return '😊 Good';
      case 4:
        return '😀 Very Good';
      case 5:
        return '🤩 Excellent';
      default:
        return '';
    }
  };

  const renderStars = () => {
    return [...Array(maxStars)].map((_, index) => {
      const isFilled = index < (hoveredRating || rating);
      return (
        <span
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
          style={{
            fontSize: '30px',
            cursor: 'pointer',
            color: isFilled ? '#FFD700' : '#D3D3D3',
            transition: 'color 0.2s ease-in-out',
            margin: '0 2px',
          }}
        >
          ★
        </span>
      );
    });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {renderStars()}
      <span style={{ marginLeft: '10px', fontSize: '18px' }}>
        {getEmojiOrWord(hoveredRating || rating)}
      </span>
    </div>
  );
};

export default StarRating;
