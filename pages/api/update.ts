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

	const fileId = req.cookies.file

	const newName = req.body.name as string | undefined;
	const content = req.body.data as string;

	//@ts-ignore
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



	res.send("updated");
}
