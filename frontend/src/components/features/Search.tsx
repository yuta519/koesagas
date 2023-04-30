export const Search = async (
  idx: string,
  searchText: string,
  episodeId: number | string
) => {
  const hitTranscripts = await fetch(
    `http://localhost:8080/api/podcasts/${idx}/search?text=${searchText}&episodeId=${episodeId}`
  ).then((data) => data.json());
  return hitTranscripts;
};
