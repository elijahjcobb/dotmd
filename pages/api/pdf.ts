/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import type { NextApiRequest, NextApiResponse } from "next"
import * as FS from "fs";
import {mdToPdf} from "md-to-pdf";
import {getAuthFromCookie} from "../../api/google";
import {google} from "googleapis";
import {Readable} from "stream";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {

	const auth = getAuthFromCookie(req.cookies);
	const drive = google.drive({version: "v3", auth});
	const fileId = req.query.file as string | undefined;
	if (!fileId) {
		res.status(400);
		res.send("No file id.");
		return;
	}

	console.log("Generating pdf for file: " + fileId);

	let fileData;
	try {
		fileData = await drive.files.get({fileId, alt: "media"})
	} catch (e) {
		const err = e as Error;
		console.error(err);
		if (err.message === "Invalid Credentials") {
			res.status(401)
			res.send("");
			return;
		}
		res.status(500);
		res.send("");
		return ;
	}

	const content = fileData.data as string | undefined;
	if (typeof content !== "string") {
		console.error("Content is not a string.");
		res.status(500);
		res.send("");
		return;
	}

	console.log("Fetched file data: " + content.length + " bytes.");

	let fileInfo;
	try {
		fileInfo = await drive.files.get({fileId, fields: "*"})
	} catch (e) {
		const err = e as Error;
		console.error(err);
		res.status(500);
		res.send("");
		return;
	}

	if (!fileInfo) {
		res.status(500);
		res.send("");
		return;
	}

	console.log("Fetched file info: " + fileInfo.data.name);

	let file;
	try {
		file = await mdToPdf({content}, { stylesheet: ["./public/pdf.css"], pdf_options: {format: "letter", margin: {left: 1, right: 1, top: 1, bottom: 1}, printBackground: true}});
	} catch (e) {
		console.error(e);
		res.status(500);
		return res.send("");
	}

	console.log("Generated PDF");

	let stream = Readable.from(file.content.toString());

	console.log("Made stream.");

	res.setHeader('Content-disposition', 'inline; filename="' + fileInfo.data.name + '"');
	res.setHeader('Content-type', 'application/pdf');
	stream.pipe(res);

	console.log("Sending file.");

}
