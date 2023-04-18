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

  public async FetchTranscriptsBySearchText(
    this: PodcastServices,
    idx: string,
    searchText: string
  ) {
    const index = this.algoria.client.initIndex(idx);
    const result = await index.search(searchText);
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

  public async CreateUser() {
    const user = await this.prisma.user.create({
      data: {
        email: "elsa@prisma.io",
        name: "Elsa Prisma",
      },
    });
  }

  public async FetchUser() {
    const user = await this.prisma.user.findUnique({
      where: {
        email: "elsa@prisma.io",
      },
    });
    return user;
  }
}
