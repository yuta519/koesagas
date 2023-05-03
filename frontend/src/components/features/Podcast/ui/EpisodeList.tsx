import { Episode } from "@/types/Podcast";
import Link from "next/link";
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
              className="mt-8 cursor-pointer sm:mx-auto sm:w-full sm:max-w-2xl"
            >
              <Link href={`/episodes/${episode.id}`}>
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                  <div className="text-base text-slate-500">
                    Episode: {episode.backnumber}
                  </div>
                  <div className="mt-5 text-base font-bold">
                    {episode.title}
                  </div>
                  <div className="pt-4">{episode.description}</div>
                </div>
              </Link>
            </div>
          ))
        : null}
    </>
  );
};
