import * as dotenv from "dotenv";
dotenv.config();

import algoliasearch from "algoliasearch";

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID || "",
  process.env.ALGOLIA_API_KEY || ""
);

const objects = [
  {
    firstname: "Yuta",
    lastname: "Kawamura",
    objectID: "myID1",
  },
  {
    firstname: "aaaaaaaaaaaaaaaa",
    lastname: "Kawamura",
    objectID: "myID2",
  },
];

const index = client.initIndex("test_index");

index.saveObjects(objects).then(({ objectIDs }) => {
  console.log(objectIDs);
});
