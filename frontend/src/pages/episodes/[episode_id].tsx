import { useEffect, useState } from "react";

import { Search } from "@/components/features/Search";
import { SearchBox } from "@/components/ui/SearchBox";

const Episode = () => {
  const [state, update] = useState<{
    searchText: string;
  }>({
    searchText: "",
  });

  useEffect(() => {
    (async () => {
      const hits = await Search("vancouver-engineers", "hello", "all");
    })();
  }, []);

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Search transcription!
        </h1>
      </div>
    </>
  );
};

export default Episode;
