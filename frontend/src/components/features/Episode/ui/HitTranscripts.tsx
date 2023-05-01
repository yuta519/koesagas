import { useMemo } from "react";
import Link from "next/link";
import { Episode } from "@/types/Podcast";

interface Props {
  episodes?: Episode[];
  hits: any[];
}

export const HitTranscripts = ({ episodes, hits }: Props) => {
  const episodeIdAndBacknumbers = useMemo(() => {
    return episodes?.map((episode) => {
      return { [episode.backnumber]: episode.id };
    });
  }, [episodes]);

  return (
    <>
      {hits.length
        ? hits.map((hit) => (
            <div
              key={hit.id}
              className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl"
            >
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <p className="text-base">
                  Episode:
                  <Link
                    href={`/episodes/${
                      episodeIdAndBacknumbers?.find((obj) => {
                        return obj[hit.episodeId];
                      })?.[hit.episodeId]
                    }`}
                  >
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
