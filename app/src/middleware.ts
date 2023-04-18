import Cors from "cors";
import { NextRequest, NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from 'next';


const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

export const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) return reject(result)
      return resolve(result)
    })
  })
}

export async function middleware(req: NextApiRequest, res: NextApiResponse) {
  // await runMiddleware(req, res, cors);
  return NextResponse.redirect(new URL('/', req.url))
}
export const config = {
  matcher: '/api/podcasts/hoge',
}
