import { useEffect, useState } from "react";

import {
  FetchEpisodeById,
  FetchFullTranscriptsById,
} from "@/components/features/Episode/api/Episodes";
import { Episode, Transcript } from "@/types/Podcast";
import { useRouter } from "next/router";

const Episode = () => {
  const router = useRouter();
  const { episodeId } = router.query;
  const [state, update] = useState<{
    episode?: Episode;
    transcripts: Transcript[];
  }>({
    episode: undefined,
    transcripts: [],
  });

  useEffect(() => {
    (async () => {
      if (episodeId === undefined) return;
      const episode = await FetchEpisodeById(episodeId as string);
      const transcripts = await FetchFullTranscriptsById(episodeId as string);
      update((prev) => ({ ...prev, episode, transcripts }));
    })();
  }, [episodeId]);

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
      <div className="sm:mx-auto sm:w-full sm:max-w-5xl">
        {state.transcripts.map((transcript) => (
          <div key={transcript.id} className="mt-5 bg-slate-200">
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
