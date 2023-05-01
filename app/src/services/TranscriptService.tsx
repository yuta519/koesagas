import { PrismaClient } from "@prisma/client";
import { AlgoriaClient } from "@/infras/AlgoriaClient";

export class TranscriptServices {
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

  public updateByObjectID = async (objectId: string) => {
    const index = this.algoria.client.initIndex("transcripts");
  };
}
