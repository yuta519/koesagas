import algoliasearch from "algoliasearch/lite";

export const FetchTranscriptsBySearchText = (
  idx: string, searchText: string
) => {
  const searchClient = algoliasearch(
    process.env.ALGOLIA_APP_ID || '',
    process.env.ALGOLIA_API_KEY || '',
  );
  const index = searchClient.initIndex(idx);
  index.search(searchText).then(({ hits }) => console.log(hits));
}
