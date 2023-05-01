import { Episode } from "@/types/Podcast";
import React from "react";

interface Props {
  episodes?: Episode[];
}

export const EpisodeList = ({ episodes }: Props) => {
  return (
    <>
      {episodes?.length
        ? episodes.map((episode) => (
            <div
              key={episode.id}
              className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl"
            >
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <div className="text-base">Episode: {episode.backnumber}</div>
                <div className="text-base">Title: {episode.title}</div>
                <div className="pt-4">{episode.description}</div>
              </div>
            </div>
          ))
        : null}
    </>
  );
};