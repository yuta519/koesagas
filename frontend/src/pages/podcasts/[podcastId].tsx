import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Search } from "@/components/features/Search";
import { SearchBox } from "@/components/ui/SearchBox";
import { NextApiRequest } from "next";
import { FetchPodcastById } from "@/components/features/Podcasts";
import { Podcast } from "@/types/Podcast";

export interface Transcript {
  id: string;
  rawText: string;
  highlightText: string;
  startAt: number;
  endAt: number;
  formatedStartAt: string;
  formatedEndAt: string;
}

const Podcast = (req: NextApiRequest) => {
  const router = useRouter();
  const [state, update] = useState<{
    searchText: string;
    hits: Transcript[];
    podcast: Podcast | null;
  }>({
    searchText: "",
    hits: [],
    podcast: null,
  });

  useEffect(() => {
    (async () => {
      const { podcastId } = router.query;
      const podcast = await FetchPodcastById(podcastId as string);
      update((prev) => ({ ...prev, podcast }));
    })();
  }, [req.query, router.query]);

  const handleSearchBoxChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      update((prev) => ({ ...prev, searchText: event.target.value }));
    },
    []
  );

  const handleSearchBoxClick = async () => {
    if (state.podcast === null) return;

    const hits = await Search(state.podcast?.indexName, state.searchText);
    const sortedHits = hits.sort(
      (x: Transcript, y: Transcript) => x.startAt - y.startAt
    );
    update((prev) => ({
      ...prev,
      hits: sortedHits as Transcript[],
    }));
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Search Transcription!
        </h1>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <select
          id="episodes"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Choose a country</option>
          {state.podcast?.episodes.map((episode) => (
            <option key={episode.id} value={episode.id}>
              {episode.title}
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
                  {hit.formatedStartAt} - {hit.formatedEndAt}
                </p>
                <div dangerouslySetInnerHTML={{ __html: hit.highlightText }} />
              </div>
            </div>
          ))
        : null}
    </>
  );
};

export default Podcast;
