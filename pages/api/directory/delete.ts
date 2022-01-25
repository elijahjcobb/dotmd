/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import {getUserFromAuth} from "../../../db/auth-silicon";
import {Directory, File} from "../../../db/DB";
import {SiQuery} from "@element-ts/silicon";
import {ObjectId} from "bson";
import {deleteFile} from "../file/delete";

export async function deleteDirectory(dir: Directory): Promise<void> {
	const files = await (new SiQuery(File, {parent: dir.getHexId()})).getAll();
	const dirs = await (new SiQuery(Directory, {parent: dir.getHexId()})).getAll();
	for (const f of files) await deleteFile(f);
	for (const d of dirs) await deleteDirectory(d);
	await dir.delete();

}

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const user = await getUserFromAuth(req);
	if (!user) return res.status(400).send("Not authorized.");
	const {id} = req.query as {id: string};
	console.log(id, user.getHexId());
	const dir = await (new SiQuery(Directory, {_id: new ObjectId(id), owner: user.getHexId()})).getFirst();
	console.log(dir);
	if (!dir) return res.status(404).send("Dir dne.");
	const parentId = dir.get("parent");
	await deleteDirectory(dir);

	res.redirect("/view/" + parentId);

}