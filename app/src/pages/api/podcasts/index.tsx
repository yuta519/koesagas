import type { NextApiRequest, NextApiResponse } from "next";

import { PodcastServices } from "@/services/PodcastServices";

type Data = { name: string };

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const podcastServices = new PodcastServices();
  const podcasts = await podcastServices.FetchPodcasts();
  console.log(podcasts);

  res.status(200).json({ name: "John Doe" });
};

export default handler;
