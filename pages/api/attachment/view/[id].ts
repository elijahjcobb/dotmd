/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {NextApiRequest, NextApiResponse} from "next";
import {getUserFromAuth} from "../../../../db/auth-silicon";
import {Attachment, File} from "../../../../db/DB";
import {SiQuery} from "@element-ts/silicon";
import {ObjectId} from "bson";
import {Readable} from "stream";

export default async (req: NextApiRequest, res: NextApiResponse) => {

	const id = req.query.id as string;
	const attachment = await SiQuery.getForId(Attachment, id);

	if (!attachment) return res.status(404).send("No image.");
	const file = await SiQuery.getForId(File, attachment.get("parent"));
	if (!file) return res.status(404).send("No image.");


	if (!file.get("public")) {
		const user = await getUserFromAuth(req);
		if (!user || !(file.get("owner").id.compare(user.getIdForce().id))) return res.status(400).send("Not authorized.");
	}

	const data = attachment.get("content");

	res.setHeader( "content-type", attachment.get("mime"));
	res.setHeader( 'content-length', data.length);
	res.send(data);

}