import type { NextApiRequest, NextApiResponse } from 'next';

type Data = { name: string | string[] | undefined};

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { podcast_uuid } = req.query;

  res.status(200).json({ name: podcast_uuid });
}

export default handler
