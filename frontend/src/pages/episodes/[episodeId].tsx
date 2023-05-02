import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Tab } from "@/components/ui/Tab";
import {
  FetchEpisodeById,
  FetchFullTranscriptsById,
} from "@/components/features/Episode/api/Episodes";
import { Episode, Podcast, Transcript } from "@/types/Podcast";
import { FetchPodcastById } from "@/components/features/Podcasts";

const Episode = () => {
  const router = useRouter();
  const { episodeId } = router.query;

  interface State {
    episode?: Episode;
    podcast?: Podcast;
    transcripts: Transcript[];
    currentTab: string;
    startAt: string;
  }

  const [state, update] = useState<State>({
    episode: undefined,
    podcast: undefined,
    transcripts: [],
    currentTab: "About",
    startAt: "00:00:00",
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

  const tabs = ["About", "Transcripts"];

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
      <div className="sm:mx-auto sm:w-full sm:max-w-5xl">
        {state.transcripts.map((transcript) => (
          <div
            key={transcript.id}
            className="mt-5 px-2 py-5 bg-white sm:rounded-lg"
          >
            <p
              className=""
              data-startat={transcript.formatedStartAt}
              onClick={handleChangeStartAt}
            >
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
