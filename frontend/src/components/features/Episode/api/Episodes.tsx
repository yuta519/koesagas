import { Episode, Transcript } from "@/types/Podcast";

export const FetchEpisodeById = async (id: string) => {
  const response: { episode: Episode } = await fetch(
    `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/episodes/${id}`
  ).then((data) => data.json());

  return response.episode;
};

export const FetchFullTranscriptsById = async (id: string) => {
  const response: { transcripts: Transcript[] } = await fetch(
    `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/episodes/${id}/fulltranscriptions`
  ).then((data) => data.json());

  return response.transcripts;
};
