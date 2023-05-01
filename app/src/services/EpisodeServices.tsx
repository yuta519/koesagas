import { PrismaClient } from "@prisma/client";

import { Transcript } from "@/entities/Transcript";
import { AlgoriaClient } from "@/infras/AlgoriaClient";

export class EpisodeServices {
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

  public FetchById = async (episodeId: string) => {
    return await this.prisma.episode.findUnique({ where: { id: episodeId } });
  };

  public async FetchFullTranscriptsById(idx: string, episodeId?: number) {
    const index = this.algoria.client.initIndex(idx);
    const result = await index.search("", {
      filters: `episodeId=${episodeId}`,
      hitsPerPage: 10000,
    });
    const transcripts = result.hits.map(
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
    const sortedTranscripts = transcripts.sort((a, b) => {
      const aStartAt = a.getStartAt();
      const bStartAt = b.getStartAt();
      if (aStartAt < bStartAt) return -1;
      if (aStartAt > bStartAt) return 1;
      return 0;
    });

    return sortedTranscripts;
  }
}
