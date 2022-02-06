/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {NextApiRequest, NextApiResponse} from "next";
import {getUserFromAuth} from "../../../../db/auth-silicon";
import {Sketch} from "../../../../db/DB";
import {SiQuery} from "@element-ts/silicon";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const user = await getUserFromAuth(req);
	if (!user) return res.status(400).send("Not authorized.");

	const id = req.query.id as string;
	const file = await SiQuery.getForId(Sketch, id);

	if (!file) return res.status(404).send("No sketch.");


	const data = file.get("svg");

	res.setHeader( "content-type", "image/svg+xml");
	res.setHeader( "content-length", data.length);
	res.send(data);

}