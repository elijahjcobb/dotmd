/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import {getUserFromAuth} from "../../../db/auth-silicon";
import {Analytics, Directory} from "../../../db/DB";
import {createSiID} from "@element-ts/silicon";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const user = await getUserFromAuth(req);
	if (!user) return res.status(400).send("Not authorized.");

	const {parent, name} = req.query as {parent: string, name: string};

	const dir = new Directory({name, parent: createSiID(parent), owner: user.getIdForce()});
	await dir.save();

	await (new Analytics({
		user: user.getIdForce(),
		targetId: dir.getIdForce(),
		targetType: "dir",
		actionType: "create"
	})).save();

	res.redirect("/view/" + parent);

}