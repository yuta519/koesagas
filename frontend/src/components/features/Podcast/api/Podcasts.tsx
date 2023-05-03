import { Podcast } from "@/types/Podcast";

export const FetchAllPodcasts = async () => {
  const response: { podcasts: Podcast[] } = await fetch(
    `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/podcasts`
  ).then((data) => data.json());

  return response.podcasts;
};

export const FetchPodcastById = async (id: string) => {
  const response: { podcast: Podcast } = await fetch(
    `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/podcasts/${id}`
  ).then((data) => data.json());

  return response.podcast;
};
