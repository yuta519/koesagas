export class Podcast {
  private id: string;
  private rawText: string;
  private highlightText: string;
  private startAt: number;
  private endAt: number;

  constructor({
    id,
    rawText,
    highlightText,
    startAt,
    endAt,
  }: {
    id: string;
    rawText: string;
    highlightText: string;
    startAt: number;
    endAt: number;
  }) {
    this.id = id;
    this.rawText = rawText;
    this.highlightText = highlightText;
    this.startAt = startAt;
    this.endAt = endAt;
  }

  public toHash() {
    return {
      id: this.id,
      rawText: this.rawText,
      highlightText: this.highlightText,
      startAt: this.startAt,
      endAt: this.endAt,
    };
  }
}
