import { OpenAIClient } from "@/infras/OpenAIClient";
import { OpenAIChat } from "langchain/llms";

export class OpenAIServices {
  private openai: OpenAIChat;

  constructor() {
    if (!process.env.OPENAI_API_KEY)
      throw new Error("OpenAI API Key is not set");

    const client = new OpenAIClient(process.env.OPENAI_API_KEY);
    this.openai = client.getOpenAI();
  }

  public async FetchSummarizeByTranscripts(transcripts: string) {
    const prompt = `論理的に通じる内容で以下を要約してください:\n===${transcripts}`;
    // const prompt = `Please summarize the following transcript:\n${transcripts}`;
    const response = await this.openai.call(prompt);
    return response;
  }
}
