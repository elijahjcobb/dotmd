/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import type {NextApiRequest, NextApiResponse} from "next";
import {getUserFromAuth} from "../../../db/auth-silicon";
import {createSiID, SiQuery} from "@element-ts/silicon";
import {Analytics, Attachment, Directory, File, Sketch} from "../../../db/DB";
import {ObjectId} from "bson";


export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const user = await getUserFromAuth(req);
	if (!user) return res.status(400).send("Not authorized.");
	const {id} = req.query as {id: string};
	const query = new SiQuery(File, {_id: createSiID(id)});
	const file = await query.getFirst();
	if (!file) return res.status(404).send("The file you are trying to copy does not exist.");
	if (!file.get("public")) return res.status(400).send("The file you are trying to copy is not public.");

	const userDefaultDir = await new SiQuery(Directory, {parent: user.getIdForce()}).getFirst();
	if (!userDefaultDir) return res.status(404).send("You do not have a root directory.");

	const newFile = new File({
		owner: user.getIdForce(),
		name: "Copy of " + file.get("name"),
		parent: userDefaultDir.getIdForce(),
		public: false,
		content: file.get("content")
	})

	let md = newFile.get("content");

	await newFile.save();

	const attachments = await new SiQuery(Attachment, {parent: file.getIdForce()}).getAll();
	const sketches = await new SiQuery(Sketch, {parent: file.getIdForce()}).getAll();

	for (const a of attachments) {
		const newA = new Attachment({
			parent: newFile.getIdForce(),
			owner: user.getIdForce(),
			content: a.get("content"),
			mime: a.get("mime")
		});
		await newA.save()
		md = md.replaceAll(a.getHexId(), newA.getHexId());
	}
	for (const s of sketches) {
		const newS = new Sketch({
			parent: newFile.getIdForce(),
			owner: user.getIdForce(),
			paths: s.get("paths"),
			svg: s.get("svg")
		});
		await newS.save()
		md = md.replaceAll(s.getHexId(), newS.getHexId());
	}

	newFile.put("content", md);
	await newFile.save();

	res.redirect("/view/" + newFile.get("parent"));

}
