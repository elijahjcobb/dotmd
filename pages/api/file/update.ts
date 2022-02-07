/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import type {NextApiRequest, NextApiResponse} from "next";
import {getUserFromAuth} from "../../../db/auth-silicon";
import {SiQuery} from "@element-ts/silicon";
import {Analytics, File} from "../../../db/DB";
import {ObjectId} from "bson";


export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const user = await getUserFromAuth(req);
	if (!user) return res.status(400).send("Not authorized.");
	const {content, id, name, publicAccess} = req.body as {content: string, id: string, name: string, publicAccess: boolean};
	const query = new SiQuery(File, {_id: new ObjectId(id)});
	const file = await query.getFirst();
	if (!file || file.get("owner").toHexString() !== user.getHexId()) return res.status(400).send("Not authorized.");
	file.put("content", content);
	file.put("name", name);
	file.put("public", publicAccess);
	await file.save();

	await (new Analytics({
		user: user.getIdForce(),
		targetId: file.getIdForce(),
		targetType: "file",
		actionType: "update"
	})).save();

	res.redirect("/view/" + file.get("parent"));

}
