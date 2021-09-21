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
	const date = new Date();
	var fileMetadata = {
		'name': 'Untitled.md',
		//@ts-ignore
		'parents': [JSON.parse(req.query.state).folderId]
	};
	var media = {
		mimeType: 'text/markdown',
		body: ""
	};

	const file = await drive.files.create({
		// @ts-ignore
		resource: fileMetadata,
		media: media,
		fields: 'id'
	});

	const oneYearFromNow = new Date();
	oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

	res.setHeader('Set-Cookie', [
		serialize('file', file.data.id ?? "", { path: '/', expires: oneYearFromNow }),
	]);

	res.redirect("/?file="+file.data.id)
}
