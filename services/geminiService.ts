
import { GoogleGenAI, Type } from "@google/genai";
import type { Flashcard } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const flashcardSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            term: {
                type: Type.STRING,
                description: "A key term, concept, or name related to the topic."
            },
            definition: {
                type: Type.STRING,
                description: "A concise and clear definition or explanation of the term."
            }
        },
        // FIX: Replaced 'required' with 'propertyOrdering' to align with the provided Gemini API guidelines for `responseSchema`.
        propertyOrdering: ["term", "definition"]
    }
};

export const generateFlashcards = async (topic: string): Promise<Flashcard[]> => {
    try {
        const prompt = `Generate 10 high-quality flashcards for the topic: "${topic}". Each flashcard must have a 'term' and a 'definition'. The term should be a core concept, and the definition should be a brief, accurate explanation suitable for studying.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: flashcardSchema,
                temperature: 0.5,
            }
        });

        const jsonText = response.text.trim();
        const flashcards = JSON.parse(jsonText);
        
        if (!Array.isArray(flashcards) || flashcards.some(card => !card.term || !card.definition)) {
            throw new Error("Invalid data format received from API.");
        }

        return flashcards;

    } catch (error) {
        console.error("Error generating flashcards:", error);
        throw new Error("Failed to generate flashcards. The topic might be too broad or unsupported.");
    }
};
