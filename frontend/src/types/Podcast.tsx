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
  description: string;
  spotifyUrl: string;
  applePodcastyUrl: string;
  podcastId: string;
  postedAt: Date;
}
