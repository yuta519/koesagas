import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Tab } from "@/components/ui/Tab";
import {
  FetchEpisodeById,
  FetchFullTranscriptsById,
} from "@/components/features/Episode/api/Episodes";
import { Episode, Transcript } from "@/types/Podcast";

const Episode = () => {
  const router = useRouter();
  const { episodeId } = router.query;

  interface State {
    episode?: Episode;
    transcripts: Transcript[];
    currentTab: string;
  }

  const [state, update] = useState<State>({
    episode: undefined,
    transcripts: [],
    currentTab: "About",
  });

  useEffect(() => {
    (async () => {
      if (episodeId === undefined) return;
      const episode = await FetchEpisodeById(episodeId as string);
      const transcripts = await FetchFullTranscriptsById(episodeId as string);
      update((prev) => ({ ...prev, episode, transcripts }));
    })();
  }, [episodeId]);

  const tabs = ["About", "Transcripts"];

  const handleChangeTab = (tab: string) => {
    update((prev) => ({ ...prev, currentTab: tab }));
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {state.episode?.title}
        </h1>
      </div>
      <div className="flex justify-center">
        <audio
          controls
          className="my-10"
          src="https://chrt.fm/track/D33GD1/rss.art19.com/episodes/865fd5ed-d8a1-46ee-9597-93a3bdb7d238.mp3#t=00:00:54,00:01:04"
        ></audio>
      </div>
      <Tab
        tabs={tabs}
        currentTab={state.currentTab}
        onChange={handleChangeTab}
      />
      <div className="sm:mx-auto sm:w-full sm:max-w-5xl">
        {state.transcripts.map((transcript) => (
          <div
            key={transcript.id}
            className="mt-5 px-2 py-5 bg-white sm:rounded-lg"
          >
            <p className="">
              [{transcript.formatedStartAt}-{transcript.formatedEndAt}]
            </p>
            <p className="ml-10">{transcript.rawText}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Episode;
