import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

import { PodcastServices } from "@/services/PodcastServices";
import { Podcast } from "@prisma/client";
import { runMiddleware } from "@/middleware";

type Data = { podcast: Podcast | null };

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await runMiddleware(req, res, cors);
  const { podcast_id } = req.query;
  const podcastServices = new PodcastServices();
  const podcast = await podcastServices.FetchById(podcast_id as string);

  res.status(200).json({ podcast });
};

export default handler;
