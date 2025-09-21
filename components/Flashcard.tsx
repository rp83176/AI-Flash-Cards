
import React, { useState, useEffect } from 'react';

interface FlashcardProps {
  term: string;
  definition: string;
}

export const Flashcard: React.FC<FlashcardProps> = ({ term, definition }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [term]);

  const cardContentClasses = "absolute w-full h-full p-6 flex flex-col justify-center items-center backface-hidden rounded-xl bg-white shadow-xl border border-slate-200";

  return (
    <div className="w-full h-64 perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Front of the card */}
        <div className={cardContentClasses}>
          <p className="text-3xl font-bold text-slate-800 text-center">{term}</p>
        </div>
        {/* Back of the card */}
        <div className={`${cardContentClasses} rotate-y-180`} style={{ transform: 'rotateY(180deg)' }}>
          <p className="text-lg text-slate-600 text-center leading-relaxed">{definition}</p>
        </div>
      </div>
    </div>
  );
};
