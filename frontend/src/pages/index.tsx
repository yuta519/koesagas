import { ChangeEvent, useCallback, useState } from "react";

import { Search } from "@/components/features/Search";
import { SearchBox } from "@/components/ui/SearchBox";
import Link from "next/link";

export interface Transcript {
  id: string;
  rawText: string;
  highlightText: string;
  startAt: number;
  endAt: number;
  formatedStartAt: string;
  formatedEndAt: string;
}

const App = () => {
  // const [state, update] = useState<{
  //   searchText: string;
  //   hits: Transcript[];
  // }>({
  //   searchText: "",
  //   hits: [],
  // });

  // const handleSearchBoxChange = useCallback(
  //   (event: ChangeEvent<HTMLInputElement>) => {
  //     update((prev) => ({ ...prev, searchText: event.target.value }));
  //   },
  //   []
  // );

  // const handleSearchBoxClick = async () => {
  //   const hits = await Search("vancouver-engineers", state.searchText, "all");
  //   const sortedHits = hits.sort(
  //     (x: Transcript, y: Transcript) => x.startAt - y.startAt
  //   );
  //   update((prev) => ({
  //     ...prev,
  //     hits: sortedHits as Transcript[],
  //   }));
  // };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          <Link href="/podcasts">To Podcast</Link>
        </h1>
      </div>
      {/* <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Search transcription!
        </h1>
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
        : null} */}
    </>
  );
};

export default App;
