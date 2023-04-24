// import { useContext } from 'react'
import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

// import { AppContext } from '@/context/AppContext';
import { Transcript } from "@/entities/Transcript";
import { PodcastServices } from "@/services/PodcastServices";
import { runMiddleware } from "@/middleware";

type Data = Transcript[];

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await runMiddleware(req, res, cors);
  const { podcast_uuid, text } = req.query;

  if (!text) throw new Error("text is not set");

  const podcastServices = new PodcastServices();
  const hits = await podcastServices.FetchTranscriptsBySearchText(
    "vancouver-engineers",
    text as string
  );

  res.status(200).json(hits);
};

export default handler;
