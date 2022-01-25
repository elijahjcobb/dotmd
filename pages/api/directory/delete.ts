/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import {getUserFromAuth} from "../../../db/auth-silicon";
import {Directory} from "../../../db/DB";
import {SiQuery} from "@element-ts/silicon";
import {ObjectId} from "bson";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const user = await getUserFromAuth(req);
	if (!user) return res.status(400).send("Not authorized.");

	const {id, name} = req.query as {id: string, name: string};

	const dir = await (new SiQuery(Directory, {_id: new ObjectId(id), owner: new ObjectId(user.getHexId())})).getFirst();
	if (!dir) return res.status(404).send("Dir dne.");

	dir.put("name", name);
	await dir.save();

	res.json(dir.toJSON());

}