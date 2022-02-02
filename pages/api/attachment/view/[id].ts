/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {NextApiRequest, NextApiResponse} from "next";
import {getUserFromAuth} from "../../../../db/auth-silicon";
import {Attachment} from "../../../../db/DB";
import {SiQuery} from "@element-ts/silicon";
import {ObjectId} from "bson";
import {Readable} from "stream";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const user = await getUserFromAuth(req);
	if (!user) return res.status(400).send("Not authorized.");

	const id = req.query.id as string;
	const file = await SiQuery.getForId(Attachment, id);

	if (!file) return res.status(404).send("No image.");


	const data = file.get("content");

	res.setHeader( "content-type", file.get("mime"));
	res.setHeader( 'content-length', data.length);
	res.send(data);

}