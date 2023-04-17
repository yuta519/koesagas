export const Search = async (idx: string, searchText: string) => {
  const hitTranscripts = await fetch(
    `http://localhost:8080/api/podcasts/${idx}/search?text=${searchText}`
  ).then((data) => data.json());
  return hitTranscripts;
};
