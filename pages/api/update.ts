/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import type { NextApiRequest, NextApiResponse } from "next"
import {getAuthFromCookie} from "../../api/google";
import {google} from "googleapis";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {

	const auth = getAuthFromCookie(req.cookies);
	const drive = google.drive({version: "v3", auth});

	const fileId = req.body.file as string | undefined;
	const newName = req.body.name as string | undefined;
	const content = req.body.data as string | undefined;

	if (!fileId || !content) {
		res.status(400);
		res.send("");
		return;
	}

	//@ts-ignore
	try {
		drive.files.update({
			fileId,
			media: {
				mimeType: "text/markdown",
				body: content
			},
			...(newName ? {
				resource: {name: newName + ".md"},
			} : {})
		})
	} catch (e) {
		console.error(e);
		res.status(500);
		res.send("")
		return
	}

	res.status(200);
	res.send("");

}
