import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Search } from "@/components/features/Search";
import { SearchBox } from "@/components/ui/SearchBox";
import { NextApiRequest } from "next";
import { FetchPodcastById } from "@/components/features/Podcasts";
import { Podcast, Transcript } from "@/types/Podcast";
import Link from "next/link";

const Podcast = (req: NextApiRequest) => {
  const router = useRouter();
  const { podcastId } = router.query;
  const [state, update] = useState<{
    searchText: string;
    targetEpisodeId: string;
    hits: Transcript[];
    podcast: Podcast | null;
  }>({
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

  const handleSearchBoxChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      update((prev) => ({ ...prev, searchText: event.target.value }));
    },
    []
  );

  const sortedEpisodes = state.podcast?.episodes.sort((x, y) => {
    return x.backnumber - y.backnumber;
  });

  // TODO: any
  const handleChangeEpisode = useCallback((event: any) => {
    update((prev) => ({ ...prev, targetEpisodeId: event.target.value }));
  }, []);

  const handleSearchBoxClick = useCallback(async () => {
    if (state.podcast === null) return;

    const hits = await Search(
      state.podcast?.indexName,
      state.searchText,
      state.targetEpisodeId
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
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <select
          id="episodes"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleChangeEpisode}
        >
          <option defaultValue="all" value="all" selected>
            All Episodes
          </option>
          {sortedEpisodes?.map((episode) => (
            <option key={episode.id} value={episode.backnumber}>
              {episode.backnumber} {episode.title}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SearchBox
            onChange={handleSearchBoxChange}
            searchText={state.searchText}
            onClick={handleSearchBoxClick}
          />
        </div>
      </div>
      {state.hits.length
        ? state.hits.map((hit) => (
            <div
              key={hit.id}
              className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl"
            >
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <p className="text-base">
                  Episode:
                  <Link href={`/episodes/${hit.episodeId}`}>
                    {hit.episodeId}
                  </Link>
                </p>
                <p className="text-base">
                  Duration: {hit.formatedStartAt} - {hit.formatedEndAt}
                </p>
                <p
                  className="pt-4"
                  dangerouslySetInnerHTML={{ __html: hit.highlightText }}
                />
              </div>
            </div>
          ))
        : null}
    </>
  );
};

export default Podcast;
