/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import type { NextApiRequest, NextApiResponse } from "next";
import {getAuthFromCookie} from "../../api/google";
import {google} from "googleapis";
import {PdMethod, PdRequest} from "@element-ts/palladium";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const auth = getAuthFromCookie(req.cookies);
	const drive = google.drive({version: "v3", auth});
	const fileId = req.cookies.file

	const file = await drive.files.get({fileId, fields: "*"})

	console.log(file);

	//@ts-ignore
	const name = file.data.owners[0].displayName as string;
	//@ts-ignore
	const profile = file.data.owners[0].photoLink as string;
	const fileName = (file.data.name as string).replace(".md", "");
	const dataUrl = file.data.webContentLink as string;

	const response = await fetch(dataUrl);
	const data = await response.text();

	res.send({name, profile, fileName, data});
	// // @ts-ignore
	// const name = file.data.name?.replace(".md", "");
	// res.send(JSON.stringify({
	// 	name,
	// 	// @ts-ignore
	// 	data: Buffer.from(file.data).toString("utf-8")
	// }));
}
