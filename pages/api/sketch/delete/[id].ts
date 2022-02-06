/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {NextApiRequest, NextApiResponse} from "next";
import {getUserFromAuth} from "../../../../db/auth-silicon";
import {Attachment, Sketch} from "../../../../db/DB";
import {SiQuery} from "@element-ts/silicon";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const user = await getUserFromAuth(req);
	if (!user) return res.status(400).send("Not authorized.");

	const id = req.query.id as string;
	const sketch = await SiQuery.getForId(Sketch, id);

	if (!sketch) return res.status(404).send("No image.");
	const fileId = sketch.get("parent");
	await sketch.delete();

	res.redirect("/edit/" + fileId);

}