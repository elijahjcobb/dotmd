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
import * as Crypto from "crypto";

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

	// let file;
	// console.log(content);
	// try {
	// 	file = await mdToPdf({content});
	// } catch (e) {
	// 	console.error(e);
	// 	res.status(500);
	// 	return res.send("");
	// }

	const tempFileName = "/home/dotmd/tmp/" + Crypto.randomBytes(8).toString("hex") + ".pdf";
	console.log("Temp path: " + tempFileName);

	const latex = "---\nscript:\n- path: mathjax-config.js\n- url: https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js\n---\n"
	
	try {
		await mdToPdf({ content: latex + content }, {
			dest: tempFileName,
			stylesheet: ["https://dotmd.app/pdf.css"],
			body_class: ["root"],
			pdf_options: {
				format: "letter",
				displayHeaderFooter: false,
				margin: {
					left: "0.5in",
					right: "0.5in",
					top: "0.5in",
					bottom: "0.5in",
				},
				printBackground: true
			}
		});
	} catch (e) {
		console.error(e);
		res.status(500);
		return res.send("");
	}


	console.log("Generated PDF");

	let stream = FS.createReadStream(tempFileName);

	console.log("Made stream.");

	res.setHeader('Content-disposition', 'inline; filename="' + fileInfo.data.name?.replace(".md", "") + '.pdf"');
	res.setHeader('Content-type', 'application/pdf');
	stream.pipe(res);

	stream.on("close", () => {
		console.log("Sent file.");
		FS.rm(tempFileName, () => {
			console.log("Deleted file.");
		});
	});

	console.log("Sending file.");

}
