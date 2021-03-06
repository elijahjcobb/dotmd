/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import {getUserFromAuth} from "../../../db/auth-silicon";
import {Analytics, Directory} from "../../../db/DB";
import {SiQuery} from "@element-ts/silicon";
import {ObjectId} from "bson";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const user = await getUserFromAuth(req);
	if (!user) return res.status(400).send("Not authorized.");

	const {id, name} = req.query as {id: string, name: string};

	const dir = await (new SiQuery(Directory, {_id: new ObjectId(id), owner: user.getIdForce()})).getFirst();
	if (!dir) return res.status(404).send("Dir dne.");

	dir.put("name", name);
	await dir.save();

	await (new Analytics({
		user: user.getIdForce(),
		targetId: dir.getIdForce(),
		targetType: "dir",
		actionType: "update"
	})).save();

	res.redirect("/view/" + dir.get("parent"));

}
