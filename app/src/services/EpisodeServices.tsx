import { PrismaClient } from "@prisma/client";
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
}
