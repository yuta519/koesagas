import algoliasearch, { SearchClient } from "algoliasearch/lite";

export class AlgoriaClient {
  public client: SearchClient;

  constructor(appId: string, apiKey: string){
    this.client = algoliasearch(appId, apiKey);
  }
}
