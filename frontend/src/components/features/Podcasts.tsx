import { Podcast } from "@/types/Podcast";

export const FetchAllPodcasts = async () => {
  const response: { podcasts: Podcast[] } = await fetch(
    `http://localhost:8080/api/podcasts`
  ).then((data) => data.json());

  return response.podcasts;
};

export const FetchPodcastById = async (id: string) => {
  const response: { podcast: Podcast } = await fetch(
    `http://localhost:8080/api/podcasts/${id}`
  ).then((data) => data.json());

  return response.podcast;
};
