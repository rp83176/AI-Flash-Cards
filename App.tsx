
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { TopicInput } from './components/TopicInput';
import { FlashcardDeck } from './components/FlashcardDeck';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { generateFlashcards } from './services/geminiService';
import type { Flashcard as FlashcardType } from './types';

enum AppState {
  INITIAL,
  LOADING,
  DISPLAYING,
  ERROR,
}

export default function App() {
  const [appState, setAppState] = useState<AppState>(AppState.INITIAL);
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (topic: string) => {
    setAppState(AppState.LOADING);
    setError(null);
    try {
      const generatedCards = await generateFlashcards(topic);
      if (generatedCards.length === 0) {
        setError("Could not generate flashcards for this topic. Please try a different one.");
        setAppState(AppState.ERROR);
      } else {
        setFlashcards(generatedCards);
        setAppState(AppState.DISPLAYING);
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred while creating the flashcards. Please check your internet connection and try a different topic.");
      setAppState(AppState.ERROR);
    }
  }, []);

  const handleReset = useCallback(() => {
    setFlashcards([]);
    setError(null);
    setAppState(AppState.INITIAL);
  }, []);

  const renderContent = () => {
    switch (appState) {
      case AppState.LOADING:
        return <LoadingSpinner />;
      case AppState.DISPLAYING:
        return <FlashcardDeck flashcards={flashcards} onReset={handleReset} />;
      case AppState.ERROR:
        return <ErrorDisplay message={error || "An unexpected error occurred."} onRetry={handleReset} />;
      case AppState.INITIAL:
      default:
        // FIX: Set `isLoading` to `false`. In this case block, `appState` is always `AppState.INITIAL`,
        // so the comparison `appState === AppState.LOADING` was always false and caused a TypeScript error.
        return <TopicInput onGenerate={handleGenerate} isLoading={false} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 text-slate-800 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-2xl">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}