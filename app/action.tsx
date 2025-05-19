"use server";

import AnimeCard, { AnimeProp } from "@/components/AnimeCard";

export const fetchAnime = async (page: number) => {
    try {
        const query = `
            query {
                Page(page: ${page}, perPage: 8) {
                    media(type: ANIME, sort: POPULARITY_DESC) {
                        id
                        title { romaji }
                        coverImage { large }
                        episodes
                        averageScore
                        type
                    }
                }
            }
        `;
        const response = await fetch("https://graphql.anilist.co", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                // "User-Agent": "Anime_Archive (sakshamrajpal20585@gmail.com)",
                // // Added Authorization and user-agent header as using OAuth2
                "Authorization": `Bearer ${process.env.ANILIST_ACCESS_TOKEN}`,
            },
            body: JSON.stringify({ query }),
            cache: "no-store",
        });

        if (!response.ok) {
            const text = await response.text();
            console.error(`AniList API request failed: Status=${response.status}, StatusText=${response.statusText}, ResponseSnippet=${text.slice(0, 200)}`);
            return [];
        }

        const { data } = await response.json();
        const animes = data?.Page?.media || [];

        return animes.map((item: any, index: number) => {
            const animeProp: AnimeProp = {
                id: item.id.toString(),
                name: item.title.romaji,
                image: { original: item.coverImage.large },
                kind: item.type,
                episodes: item.episodes || 0,
                episodes_aired: item.episodes || 0,
                score: (item.averageScore / 10).toFixed(1), // Convert AniList score (0-100) to Shikimori scale (0-10)
            };
            return <AnimeCard key={item.id} anime={animeProp} index={index} />;
        });
    } catch (error) {
        console.error("Error fetching AniList API:", (error as Error).message, "Stack:", (error as Error).stack);
        return [];
    }
};
