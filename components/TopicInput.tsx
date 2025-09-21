import React, { useState } from 'react';

interface TopicInputProps {
    onGenerate: (topic: string) => void;
    isLoading: boolean;
}

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
);

export const TopicInput: React.FC<TopicInputProps> = ({ onGenerate, isLoading }) => {
    const [topic, setTopic] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (topic.trim() && !isLoading) {
            onGenerate(topic.trim());
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center animate-fade-in">
            <h2 className="text-2xl font-semibold text-slate-700 mb-2">Explore any Topic</h2>
            <p className="text-slate-500 mb-6">Simply enter a subject below, and our AI will generate a customized set of flashcards to help you learn.</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., 'History of Ancient Rome' or 'Quantum Physics Basics'"
                    className="flex-grow w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                    disabled={isLoading || !topic.trim()}
                >
                    <span>Create Flashcards</span>
                    <ArrowRightIcon />
                </button>
            </form>
        </div>
    );
};