import { Prisma, PrismaClient } from "@prisma/client";
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
          rawText: podcast.text,
          highlightText: podcast._highlightResult.text.value,
          startAt: podcast.startAt,
          endAt: podcast.endAt,
        })
    );
    return podcasts;
  }

  public async CreatePodcast() {
    const podcast = await this.prisma.podcast.create({
      data: {
        name: "バンクーバーのえんじに屋",
        indexName: "vancouver-engineers",
        imageUrl:
          "https://content.production.cdn.art19.com/images/21/29/55/8c/2129558c-b1a7-4d6c-8ebe-9306ff147b76/bab81362790830baf24d2c8ef5055984a16f5b60d6227d9e2f834968bcd3f326b9a3d34a7f9d32150bd08cd9b0ad924c3de016e0d4203c34a1d9b8af2477d112.jpeg",
        createdAt: "2020-10-19T00:00:00Z",
      },
    });
  }
}
