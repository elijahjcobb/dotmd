/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import {getUserFromAuth} from "../../../db/auth-silicon";
import {Analytics, File} from "../../../db/DB";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const user = await getUserFromAuth(req);
	if (!user) return res.status(400).send("Not authorized.");

	const {parent, name} = req.query as {parent: string, name: string};

	const file = new File({name, parent, owner: user.getHexId(), content: ""});
	await file.save();

	await (new Analytics({
		user: user.getHexId(),
		targetId: file.getHexId(),
		targetType: "file",
		actionType: "create"
	})).save();

	res.redirect("/view/" + parent);

}