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

  public getStartAt(): number {
    return this.startAt;
  }

  private formatTime(time: number): string {
    const rawHour = Math.floor(time / 3600);
    const rawMin = Math.floor((time % 3600) / 60);
    const rawSec = Math.floor(time % 60);

    const hour = rawHour < 10 ? `0${rawHour}` : rawHour;
    const min = rawMin < 10 ? `0${rawMin}` : rawMin;
    const sec = rawSec < 10 ? `0${rawSec}` : rawSec;

    return `${hour}:${min}:${sec}`;
  }
}
