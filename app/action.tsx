"use server";

import AnimeCard, { AnimeProp } from "@/components/AnimeCard";

export const fetchAnime = async (page: number) => {
    try {
        const response = await fetch(
            `https://shikimori.one/api/animes?page=${page}&limit=8&order=popularity`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Anime_Archive/0.1.0 (saksham.rajpal@example.com)', // Added User-Agent
                },
            }
        );

        if (!response.ok) {
            const text = await response.text();
            console.error(`Shikimori API request failed: ${response.status} ${response.statusText}, Response: ${text.slice(0, 200)}`);
            return []; // Return empty array to prevent build failure
        }

        const data = await response.json();

        return data.map((item: AnimeProp, index: number) => (
            <AnimeCard key={item.id} anime={item} index={index} />
        ));
    } catch (error) {
        console.error('Error fetching Shikimori API:', (error as Error).message); // Type assertion
        return [];
    }
};
