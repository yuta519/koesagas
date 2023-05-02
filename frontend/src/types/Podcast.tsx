export interface Podcast {
  id: string;
  name: string;
  indexName: string;
  imageUrl: string;
  episodes: Episode[];
  createdAt: Date;
}

export interface Episode {
  id: string;
  title: string;
  backnumber: number;
  srcUrl: string;
  description: string;
  spotifyUrl: string;
  applePodcastyUrl: string;
  podcastId: string;
  postedAt: Date;
}

export interface Transcript {
  id: string;
  episodeId: number;
  rawText: string;
  highlightText: string;
  startAt: number;
  endAt: number;
  formatedStartAt: string;
  formatedEndAt: string;
}
