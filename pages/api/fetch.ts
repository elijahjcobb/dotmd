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

	drive.files.get({
		fileId: fileId,
		alt: 'media'
	})
		// @ts-ignore
		.on('end', function () {
			console.log('Done');
		})
		// @ts-ignore
		.on('error', function (err) {
			console.log('Error during download', err);
		})
		.pipe(res);
	// const file = drive.files.get({fileId}, {responseType: "stream"}).on
	// const name = file.data.name?.replace(".md", "");
	// res.send(JSON.stringify({
	// 	name,
	// 	// @ts-ignore
	// 	data: Buffer.from(file.data).toString("utf-8")
	// }));
}
