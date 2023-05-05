import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

import { runMiddleware } from "@/middleware";
import { OpenAIServices } from "@/services/OpenAIServices";

type Data = { summaryText?: string };

const cors = Cors({
  methods: ["POST", "HEAD"],
});

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await runMiddleware(req, res, cors);
  const { text }: { text: string } = req.body;

  const openAIServices = new OpenAIServices();
  const summaryText = await openAIServices.FetchSummarizeByTranscripts(text);

  res.status(201).json({ summaryText });
};

export default handler;
