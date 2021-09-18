/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

 import type { NextApiRequest, NextApiResponse } from "next"
 import {getAuthFromCookie} from "../../api/google";
 import {google} from "googleapis";
 import {serialize} from "cookie";
 
 export default async function handler(
     req: NextApiRequest,
     res: NextApiResponse
 ) {
     const auth = getAuthFromCookie(req.cookies);
     const drive = google.drive({version: "v3", auth});
 
     //@ts-ignore
     const fileId = JSON.parse(req.query["state"])["ids"][0] as string;
 
     res.setHeader('Set-Cookie', [
         serialize('file', fileId, { path: '/' }),
     ]);
 
     res.redirect("/")
 
 }