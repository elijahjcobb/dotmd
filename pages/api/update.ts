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

	drive.files.update({
		fileId,
		media: {
			mimeType: "text/markdown",
			body: new Date().toLocaleTimeString() + " was updated!!!"
		}
	})

	res.send("updated");
}
