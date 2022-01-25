/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import type {NextApiRequest, NextApiResponse} from "next";
import {getUserFromAuth} from "../../../db/auth-silicon";
import {SiQuery} from "@element-ts/silicon";
import {Attachment, File} from "../../../db/DB";
import {ObjectId} from "bson";

export async function deleteFile(file: File): Promise<void> {
	await file.delete();
	const attachments = await (new SiQuery(Attachment, {parent: file.getId()})).getAll();
	for (const a of attachments) await a.delete();
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const user = await getUserFromAuth(req);
	if (!user) return res.status(400).send("Not authorized.");
	const {id} = req.body as {content: string, id: string, name: string};
	const query = new SiQuery(File, {_id: new ObjectId(id)});
	const file = await query.getFirst();
	if (!file || file.get("owner") !== user.getHexId())return res.status(400).send("Not authorized.");
	await deleteFile(file);

	res.send({status: "Deleted"});
}
