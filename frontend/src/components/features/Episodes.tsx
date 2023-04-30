import { Episode } from "@/types/Podcast";

export const FetchEpisodeById = async (id: string) => {
  const response: { episode: Episode } = await fetch(
    `http://localhost:8080/api/episodes/${id}`
  ).then((data) => data.json());

  return response.episode;
};
