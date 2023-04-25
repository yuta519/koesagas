import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

import { runMiddleware } from "@/middleware";
import { Podcast } from "@prisma/client";
import { PodcastServices } from "@/services/PodcastServices";

type Data = { podcasts: Podcast[] };

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await runMiddleware(req, res, cors);
  const podcastServices = new PodcastServices();
  const podcasts = await podcastServices.FetchPodcasts();

  res.status(200).json({ podcasts });
};

export default handler;
