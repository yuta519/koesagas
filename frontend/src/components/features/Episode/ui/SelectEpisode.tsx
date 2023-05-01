import React from "react";
import { Episode } from "@/types/Podcast";

export interface SelectBoxProp {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  episodes?: Episode[];
}

export const SelectEpisode = ({ onChange, episodes }: SelectBoxProp) => {
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
      <select
        id="episodes"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={onChange}
      >
        <option defaultValue="all" value="all" selected>
          All Episodes
        </option>
        {episodes?.map((episode) => (
          <option key={episode.id} value={episode.id}>
            {episode.backnumber} {episode.title}
          </option>
        ))}
      </select>
    </div>
  );
};
