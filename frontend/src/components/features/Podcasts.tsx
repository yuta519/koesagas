import { Podcast } from "@/types/Podcast";

export const FetchAllPodcasts = async () => {
  const response: { podcasts: Podcast[] } = await fetch(
    `http://localhost:8080/api/podcasts`
  ).then((data) => data.json());

  return response.podcasts;
};
