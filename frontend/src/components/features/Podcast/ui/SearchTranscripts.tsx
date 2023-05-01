import React from "react";

import { Episode, Transcript } from "@/types/Podcast";
import { HitTranscripts } from "./HitTranscripts";
import { SearchBox } from "@/components/ui/SearchBox";
import { SelectEpisode } from "./SelectEpisode";

interface Props {
  episodes?: Episode[];
  onChangeEpisode: (event: any) => void;
  searchText: string;
  onChangeSearchText: (event: any) => void;
  onClickSearchButton: () => void;
  hitTranscripts?: Transcript[];
}

export const SearchTranscripts = ({
  episodes,
  onChangeEpisode,
  searchText,
  onChangeSearchText,
  onClickSearchButton,
  hitTranscripts,
}: Props) => {
  return (
    <>
      <SelectEpisode onChange={onChangeEpisode} episodes={episodes} />
      <SearchBox
        searchText={searchText}
        onChange={onChangeSearchText}
        onClick={onClickSearchButton}
      />
      {hitTranscripts?.length ? (
        <HitTranscripts episodes={episodes} hits={hitTranscripts} />
      ) : null}
    </>
  );
};
