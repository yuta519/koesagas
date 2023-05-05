import { OpenAIChat } from "langchain/llms";

export class OpenAIClient {
  private openai: OpenAIChat;

  constructor(OPENAI_API_KEY: string) {
    this.openai = new OpenAIChat({
      openAIApiKey: OPENAI_API_KEY,
      modelName: "gpt-3.5-turbo",
    });
  }

  public getOpenAI() {
    return this.openai;
  }
}
