/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {NextApiRequest, NextApiResponse} from "next";
import {getUserFromAuth} from "../../../../db/auth-silicon";
import {File, Sketch} from "../../../../db/DB";
import {SiQuery} from "@element-ts/silicon";

export default async (req: NextApiRequest, res: NextApiResponse) => {


	const id = req.query.id as string;
	const sketch = await SiQuery.getForId(Sketch, id);

	if (!sketch) return res.status(404).send("No sketch.");
	const file = await SiQuery.getForId(File, sketch.get("parent"));
	if (!file) return res.status(404).send("No sketch.");


	if (!file.get("public")) {
		const user = await getUserFromAuth(req);
		if (!user || (file.get("owner").toHexString() !== user.getHexId())) return res.status(400).send("Not authorized.");
	}


	const data = sketch.get("svg");

	res.setHeader( "content-type", "image/svg+xml");
	res.setHeader( "content-length", data.length);
	res.send(data);

}