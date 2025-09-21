import React from 'react';

export const LoadingSpinner: React.FC = () => {
    const messages = [
        "Analyzing your topic...",
        "Structuring key concepts...",
        "Defining important terms...",
        "Building your study deck...",
        "Finalizing your flashcards...",
    ];
    
    const [message, setMessage] = React.useState(messages[0]);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setMessage(prevMessage => {
                const currentIndex = messages.indexOf(prevMessage);
                const nextIndex = (currentIndex + 1) % messages.length;
                return messages[nextIndex];
            });
        }, 2000);

        return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in">
            <div className="w-16 h-16 border-4 border-t-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-lg font-semibold text-slate-600 transition-opacity duration-500">{message}</p>
        </div>
    );
};