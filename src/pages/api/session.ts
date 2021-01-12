import { ISession } from "@auth0/nextjs-auth0/dist/session/session"
import { IncomingMessage } from "http"
import { NextApiRequest, NextApiResponse } from "next"
import auth0 from "../../lib/auth0"

export async function getSession(req: IncomingMessage): Promise<ISession | null> {
  const s = await auth0.getSession(req)
  if (s == null) return null
  return {
    ...s,
  }
}

export default async function session(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.json(await getSession(req))
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).json({
      error: true,
      message: "Internal server error",
      code: 500,
    })
  }
}