/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import type { NextApiRequest, NextApiResponse } from "next";
import {getAuthFromCookie} from "../../api/google";
import {google} from "googleapis";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const auth = getAuthFromCookie(req.cookies);
	const drive = google.drive({version: "v3", auth});
	const fileId = req.cookies.file

	const file = drive.files.get({fileId, alt: 'media'})
	res.send(file);
	// // @ts-ignore
	// const name = file.data.name?.replace(".md", "");
	// res.send(JSON.stringify({
	// 	name,
	// 	// @ts-ignore
	// 	data: Buffer.from(file.data).toString("utf-8")
	// }));
}
