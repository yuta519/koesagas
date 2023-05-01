import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

import { Transcript } from "@/entities/Transcript";
import { runMiddleware } from "@/middleware";
import { EpisodeServices } from "@/services/EpisodeServices";
import { PodcastServices } from "@/services/PodcastServices";

type Data = { transcripts: Transcript[] | null };

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await runMiddleware(req, res, cors);
  const { episode_id } = req.query;
  const episodeServices = new EpisodeServices();
  const podcastServices = new PodcastServices();

  const episode = await episodeServices.FetchById(episode_id as string);
  if (!episode) throw "Episode not found";

  const podcast = await podcastServices.FetchById(episode.podcastId);
  if (!podcast) throw "Podcast not found";

  const transcripts = await episodeServices.FetchFullTranscriptsById(
    podcast?.indexName,
    episode.backnumber
  );

  res.status(200).json({ transcripts });
};

export default handler;
