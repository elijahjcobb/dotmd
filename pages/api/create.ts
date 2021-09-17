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
	var fileMetadata = {
		'name': 'file.md',
		//@ts-ignore
		'parents': [JSON.parse(req.query.state).folderId]
	};
	var media = {
		mimeType: 'text/markdown',
		body: "# new file\n"
	};

	const file = await drive.files.create({
		// @ts-ignore
		resource: fileMetadata,
		media: media,
		fields: 'id'
	});

	res.setHeader('Set-Cookie', [
		serialize('file', file.data.id ?? "", { path: '/' }),
	]);

	res.redirect("/")
}
