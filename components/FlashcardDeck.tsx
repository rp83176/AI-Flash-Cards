import React, { useState, useCallback } from 'react';
import { Flashcard } from './Flashcard';
import type { Flashcard as FlashcardType } from '../types';

interface FlashcardDeckProps {
  flashcards: FlashcardType[];
  onReset: () => void;
}

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
);

const ArrowPathIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0l3.181-3.183m-11.667 0-3.181 3.183" />
    </svg>
);

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ flashcards, onReset }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const goToNextCard = useCallback(() => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  }, [flashcards.length]);

  const goToPrevCard = useCallback(() => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  }, [flashcards.length]);

  const currentCard = flashcards[currentCardIndex];

  return (
    <div className="w-full flex flex-col items-center gap-6 animate-fade-in">
      <Flashcard key={currentCardIndex} term={currentCard.term} definition={currentCard.definition} />
      
      <div className="flex items-center justify-between w-full max-w-sm">
        <button
          onClick={goToPrevCard}
          className="p-3 rounded-full bg-white text-slate-600 hover:bg-slate-100 hover:text-indigo-600 transition-colors duration-200 shadow-md border border-slate-200"
          aria-label="Previous card"
        >
          <ChevronLeftIcon />
        </button>
        <span className="text-lg font-medium text-slate-600">
          {currentCardIndex + 1} / {flashcards.length}
        </span>
        <button
          onClick={goToNextCard}
          className="p-3 rounded-full bg-white text-slate-600 hover:bg-slate-100 hover:text-indigo-600 transition-colors duration-200 shadow-md border border-slate-200"
          aria-label="Next card"
        >
          <ChevronRightIcon />
        </button>
      </div>

      <button
        onClick={onReset}
        className="mt-4 inline-flex items-center justify-center px-5 py-2 text-base font-medium text-indigo-600 bg-indigo-100 rounded-lg hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
      >
        <ArrowPathIcon/>
        Create a New Deck
      </button>
    </div>
  );
};