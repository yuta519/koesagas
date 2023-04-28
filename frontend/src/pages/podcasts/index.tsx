import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { FetchAllPodcasts } from "@/components/features/Podcasts";
import { Podcast } from "@/types/Podcast";

const Podcasts = () => {
  const [state, update] = useState<{ podcasts: Podcast[] }>({ podcasts: [] });

  useEffect(() => {
    (async () => {
      const podcasts: Podcast[] = await FetchAllPodcasts();
      update((prev) => ({ ...prev, podcasts }));
    })();
  }, []);

  console.log(state.podcasts || []);

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Podcasts
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {state.podcasts
          ? state.podcasts.map((podcast) => (
              <div
                key={podcast.id}
                className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
              >
                <Link href={`podcasts/${podcast.id}`}>
                  <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 container">
                    <h2 className="sm:text-sm text-base font-medium text-gray-800 mb-4">
                      {podcast.name}
                    </h2>
                    <Image
                      className="mx-auto"
                      src={podcast.imageUrl}
                      alt=""
                      width="300"
                      height="300"
                    />
                  </div>
                </Link>
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default Podcasts;
