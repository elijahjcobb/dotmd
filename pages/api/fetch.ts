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

	drive.files.get({ fileId: fileId, alt: 'media', fields: "*" }).then(result => { console.log(result); }).catch(err=>{ console.log(err); })

	const fileInfo = await drive.files.get({fileId, fields: "*"})
	//@ts-ignore
	const name = fileInfo.data.owners[0].displayName as string;
	//@ts-ignore
	const profile = fileInfo.data.owners[0].photoLink as string;
	const fileName = (fileInfo.data.name as string).replace(".md", "");

	const fileData = await drive.files.get({fileId, alt: "media"})

	res.send({name, profile, fileName, data: fileData.data});
}
