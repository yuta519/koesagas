import { PrismaClient } from "@prisma/client";
import { AlgoriaClient } from "@/infras/AlgoriaClient";
import { Transcript } from "@/entities/Transcript";

export class PodcastServices {
  private algoria: AlgoriaClient;
  private prisma: PrismaClient;

  constructor() {
    if (!process.env.ALGOLIA_APP_ID || !process.env.ALGOLIA_API_KEY) {
      throw new Error("Algoria API Key or API ID is not set");
    }
    this.algoria = new AlgoriaClient(
      process.env.ALGOLIA_APP_ID,
      process.env.ALGOLIA_API_KEY
    );
    this.prisma = new PrismaClient();
  }

  public async FetchPodcasts() {
    return await this.prisma.podcast.findMany();
  }

  public FetchById = async (id: string) => {
    return await this.prisma.podcast.findUnique({
      where: { id: id },
      include: { episodes: true },
    });
  };

  public async FetchTranscriptsBySearchText(
    this: PodcastServices,
    idx: string,
    searchText: string,
    episodeId?: string
  ) {
    const index = this.algoria.client.initIndex(idx);
    const filterCondition =
      episodeId !== "all" ? { filters: `episodeId=${episodeId}` } : {};
    const result = await index.search(searchText, filterCondition);
    const podcasts = result.hits.map(
      (podcast: any) =>
        new Transcript({
          id: podcast.objectID,
          episodeId: podcast.episodeId,
          rawText: podcast.text,
          highlightText: podcast._highlightResult.text.value,
          startAt: podcast.startAt,
          endAt: podcast.endAt,
        })
    );
    return podcasts;
  }
}
