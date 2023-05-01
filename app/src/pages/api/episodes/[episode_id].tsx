import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

import { EpisodeServices } from "@/services/EpisodeServices";
import { Episode } from "@prisma/client";
import { runMiddleware } from "@/middleware";

type Data = { episode: Episode | null };

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await runMiddleware(req, res, cors);
  const { episode_id } = req.query;
  const episodeServices = new EpisodeServices();
  const episode = await episodeServices.FetchById(episode_id as string);

  res.status(200).json({ episode });
};

export default handler;
