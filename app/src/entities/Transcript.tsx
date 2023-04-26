export class Transcript {
  private id: string;
  private episodeId: string;
  private rawText: string;
  private highlightText: string;
  private startAt: number;
  private formatedStartAt: string;
  private endAt: number;
  private formatedEndAt: string;

  constructor({
    id,
    episodeId,
    rawText,
    highlightText,
    startAt,
    endAt,
  }: {
    id: string;
    episodeId: string;
    rawText: string;
    highlightText: string;
    startAt: number;
    endAt: number;
  }) {
    this.id = id;
    this.episodeId = episodeId;
    this.rawText = rawText;
    this.highlightText = highlightText.replace(
      /<em>/g,
      '<em class="highlight">'
    );
    this.startAt = startAt;
    this.endAt = endAt;
    this.formatedStartAt = this.formatTime(startAt);
    this.formatedEndAt = this.formatTime(endAt);
  }

  private formatTime(time: number): string {
    const hour = Math.floor(time / 3600);
    const min = Math.floor((time % 3600) / 60);
    const sec = Math.floor(time % 60);

    return `${hour}:${min}:${sec}`;
  }
}
