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

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const user = await getUserFromAuth(req);
	if (!user) return res.status(400).send("Not authorized.");

	const id = req.query.id as string;
	const attachment = await SiQuery.getForId(Attachment, id);

	if (!attachment) return res.status(404).send("No image.");
	const fileId = attachment.get("parent");
	await attachment.delete();

	res.redirect("/edit/" + fileId);

}