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
  backNumber: number;
  title: string;
  description: string;
  spotifyUrl: string;
  applePodcastyUrl: string;
  podcastId: string;
  postedAt: Date;
}
