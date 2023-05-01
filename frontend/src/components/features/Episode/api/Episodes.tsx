import { Episode, Transcript } from "@/types/Podcast";

export const FetchEpisodeById = async (id: string) => {
  const response: { episode: Episode } = await fetch(
    `http://localhost:8080/api/episodes/${id}`
  ).then((data) => data.json());

  return response.episode;
};

export const FetchFullTranscriptsById = async (id: string) => {
  const response: { transcripts: Transcript[] } = await fetch(
    `http://localhost:8080/api/episodes/${id}/fulltranscriptions`
  ).then((data) => data.json());

  return response.transcripts;
};
