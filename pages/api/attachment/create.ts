/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import {getUserFromAuth} from "../../../db/auth-silicon";
import {Attachment} from "../../../db/DB";
import Jimp from "jimp";
import * as FS from "fs";
import * as Crypto from "crypto";
import {createSiID} from "@element-ts/silicon";

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '10mb' // Set desired value here
		}
	}
}

export default async (req: NextApiRequest, res: NextApiResponse) => {

	console.log("creating new file?")

	const user = await getUserFromAuth(req);
	if (!user) return res.status(400).send("Not authorized.");

	const {content, id, mime} = req.body as {id: string, content: string, mime: string};
	let image = content.split(",")[1];
	let imageData = Buffer.from(image, "base64");

	if (imageData.length > 2_000_000) {
		const fileName = "/tmp/" + Crypto.randomBytes(4).toString("hex");
		FS.writeFileSync(fileName, imageData);
		const j = await Jimp.read(fileName);

		if (j.getWidth() > 800) j.resize(800, Jimp.AUTO);

		await j.writeAsync(fileName);
		imageData = FS.readFileSync(fileName);
		FS.unlinkSync(fileName);
	}

	const file = new Attachment({parent: createSiID(id), mime, owner: user.getIdForce(), content: imageData});

	try {
		await file.save();
	} catch (e) {
		console.error(e);
		return res.status(400).send("Error uploading file.");
	}

	res.setHeader("content-type", "");
	res.send({
		...file.toJSON(),
		content: file.get("content").toString("base64")
	})

}