import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Tab } from "@/components/ui/Tab";
import {
  FetchEpisodeById,
  FetchFullTranscriptsById,
} from "@/components/features/Episode/api/Episodes";
import { Episode, Podcast, Transcript } from "@/types/Podcast";
import { FetchPodcastById } from "@/components/features/Podcast/api/Podcasts";
import { Summary } from "@/components/features/Summary";

const Episode = () => {
  const router = useRouter();
  const { episodeId } = router.query;

  interface summary {
    duration: string;
    text: string;
  }

  interface State {
    episode?: Episode;
    podcast?: Podcast;
    transcripts: Transcript[];
    currentTab: string;
    startAt: string;
    summaryText: summary[];
  }

  const [state, update] = useState<State>({
    episode: undefined,
    podcast: undefined,
    transcripts: [],
    currentTab: "Transcripts",
    startAt: "00:00:00",
    summaryText: [],
  });

  useEffect(() => {
    (async () => {
      if (episodeId === undefined) return;
      const episode = await FetchEpisodeById(episodeId as string);
      const podcast = await FetchPodcastById(episode.podcastId as string);
      const transcripts = await FetchFullTranscriptsById(episodeId as string);
      update((prev) => ({ ...prev, episode, podcast, transcripts }));
    })();
  }, [episodeId]);

  const tabs = ["Transcripts", "Summary"];

  const handleChangeTab = (tab: string) => {
    update((prev) => ({ ...prev, currentTab: tab }));
  };

  const handleChangeStartAt = (
    event: React.MouseEvent<HTMLParagraphElement>
  ) => {
    const startAt = event.currentTarget.dataset.startat;
    if (!startAt) return;
    update((prev) => ({ ...prev, startAt }));
  };

  const seperateTranscriptsBy10min = () => {
    let temp: { [key: string]: string } = {};
    state.transcripts.forEach((transcript) => {
      const key = String(Math.floor(transcript.startAt / 600));
      temp[key]
        ? (temp[key] += [transcript.rawText])
        : (temp[key] = transcript.rawText);
    });
    return temp;
  };

  const handleClickSummary = async () => {
    const transcripts = seperateTranscriptsBy10min();
    let summaryText: any[] = [];
    for (const key in transcripts) {
      const summary = await Summary(transcripts[key]);
      const duration = Number(key) * 10 + 10;
      const time = `${duration - 10}-${duration}`;
      summaryText.push({ duration: time, text: summary.summaryText });
    }
    update((prev) => ({ ...prev, summaryText }));
    console.log(state.summaryText);
  };

  const test = () => {
    console.log(state.summaryText);
    state.summaryText.forEach((summary) => {
      console.log(summary);
      console.log(summary.text);
      console.log(summary.duration);
    });
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <h3 className="mt-6 text-center text-base text-gray-500">
          {state.podcast?.name}
        </h3>
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {state.episode?.title}
        </h1>
      </div>
      <div className="flex justify-center">
        <audio
          controls
          className="my-10"
          src={`${state.episode?.srcUrl}#t=${state.startAt}`}
        ></audio>
      </div>
      <Tab
        tabs={tabs}
        currentTab={state.currentTab}
        onChange={handleChangeTab}
      />
      {state.currentTab === "Transcripts" ? (
        <div className="sm:mx-auto sm:w-full sm:max-w-5xl">
          {state.transcripts.map((transcript) => (
            <div
              key={transcript.id}
              className="mt-5 px-2 py-5 bg-white sm:rounded-lg cursor-pointer hover:bg-gray-50 sm:px-6"
            >
              <p
                className="text-sm font-medium text-gray-500"
                data-startat={transcript.formatedStartAt}
                onClick={handleChangeStartAt}
              >
                [{transcript.formatedStartAt}-{transcript.formatedEndAt}]
              </p>
              <p className="ml-10">{transcript.rawText}</p>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="sm:mx-auto sm:w-full sm:max-w-5xl">
            <button
              className="mt-4 mx-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={handleClickSummary}
            >
              Summarize
            </button>
            {/* <div className="mt-5 px-2 py-5 bg-white sm:rounded-lg hover:bg-gray-50 sm:px-6">
              <button onClick={test}>test</button>
            </div> */}
          </div>
          <div className="sm:mx-auto sm:w-full sm:max-w-5xl">
            {state.summaryText.map((summary) => (
              <div
                key={summary.duration}
                className="mt-5 px-2 py-5 bg-white sm:rounded-lg cursor-pointer hover:bg-gray-50 sm:px-6"
              >
                <p className="text-sm font-medium text-gray-500">
                  [{`${summary.duration} min`}]
                </p>
                <p className="mt-1 text-sm text-gray-900">{summary.text}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Episode;
