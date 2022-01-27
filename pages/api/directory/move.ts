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

	const {dest, src} = req.query as {src: string, dest: string};


	const dirSrc = await (new SiQuery(Directory, {_id: new ObjectId(src), owner: user.getHexId()})).getFirst();
	const dirDest = await (new SiQuery(Directory, {_id: new ObjectId(dest), owner: user.getHexId()})).getFirst();
	if (!dirSrc || !dirDest) return res.status(404).send("Dir dne.");

	const oldParent = dirSrc.get("parent")
	dirSrc.put("parent", dirDest.getHexId());
	await dirSrc.save();

	await (new Analytics({
		user: user.getHexId(),
		targetId: dirSrc.getHexId(),
		targetType: "dir",
		actionType: "move"
	})).save();

	res.redirect("/view/" + oldParent);

}
