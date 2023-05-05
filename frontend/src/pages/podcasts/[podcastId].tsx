import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextApiRequest } from "next";

import { Podcast, Transcript } from "@/types/Podcast";
import { Search } from "@/components/features/Search";
import { FetchPodcastById } from "@/components/features/Podcast/api/Podcasts";
import { EpisodeList } from "@/components/features/Podcast/ui/EpisodeList";
import { SearchTranscripts } from "@/components/features/Podcast/ui/SearchTranscripts";
import { Tab } from "@/components/ui/Tab";

const Podcast = (req: NextApiRequest) => {
  const router = useRouter();
  const { podcastId } = router.query;

  interface State {
    currentTab: string;
    searchText: string;
    targetEpisodeId: string;
    hits: Transcript[];
    podcast: Podcast | null;
  }
  const [state, update] = useState<State>({
    currentTab: "About",
    searchText: "",
    targetEpisodeId: "all",
    hits: [],
    podcast: null,
  });

  useEffect(() => {
    if (podcastId) {
      (async () => {
        const podcast = await FetchPodcastById(podcastId as string);
        update((prev) => ({ ...prev, podcast }));
      })();
    }
  }, [podcastId]);

  const tabs = ["About", "Transcripts", "Episodes"];

  const sortedEpisodes = state.podcast?.episodes.sort((x, y) => {
    return y.backnumber - x.backnumber;
  });

  const handleChangeSearchBox = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      update((prev) => ({ ...prev, searchText: event.target.value }));
    },
    []
  );

  const handleChangeTab = useCallback((tab: string) => {
    update((prev) => ({ ...prev, currentTab: tab }));
  }, []);

  // TODO: any
  const handleChangeEpisode = useCallback((event: any) => {
    update((prev) => ({
      ...prev,
      targetEpisodeId: event.target.value,
    }));
  }, []);

  const handleClickSearchBox = useCallback(async () => {
    if (state.podcast === null) return;
    const targetEpisodeBacknumber = state.podcast.episodes.find((episode) => {
      return episode.id === state.targetEpisodeId;
    })?.backnumber;
    const hits = await Search(
      state.podcast?.indexName,
      state.searchText,
      targetEpisodeBacknumber || "all"
    );
    const sortedHits = hits.sort(
      (x: Transcript, y: Transcript) => x.startAt - y.startAt
    );
    update((prev) => ({
      ...prev,
      hits: sortedHits as Transcript[],
    }));
  }, [state.podcast, state.searchText, state.targetEpisodeId]);

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {state.podcast?.name}
        </h1>
        <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">
          Search Transcription!
        </h2>
      </div>
      <Tab
        tabs={tabs}
        currentTab={state.currentTab}
        onChange={handleChangeTab}
      ></Tab>
      {state.currentTab === "About" ? () => {} : null}
      {state.currentTab === "Transcripts" ? (
        <SearchTranscripts
          episodes={sortedEpisodes}
          onChangeEpisode={handleChangeEpisode}
          searchText={state.searchText}
          onChangeSearchText={handleChangeSearchBox}
          onClickSearchButton={handleClickSearchBox}
          hitTranscripts={state.hits}
        />
      ) : null}
      {state.currentTab === "Episodes" ? (
        <EpisodeList episodes={sortedEpisodes} />
      ) : null}
    </>
  );
};

export default Podcast;
