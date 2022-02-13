/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import type {NextApiRequest, NextApiResponse} from 'next';
import {getUserFromAuth} from "../../../db/auth-silicon";
import {Sketch} from "../../../db/DB";
import {createSiID, SiQuery} from "@element-ts/silicon";

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '10mb' // Set desired value here
		}
	}
}

export default async (req: NextApiRequest, res: NextApiResponse) => {

	const user = await getUserFromAuth(req);
	if (!user) return res.status(400).send("Not authorized.");

	const data = req.body as {
		id: string | undefined
		parent: string,
		svg: string,
		paths: string,
	};

	if (data.id && !(data.id.length === 12 || data.id.length === 24)) data.id = undefined;
	let sketch = await SiQuery.getForId(Sketch, data.id);
	if (!sketch) {
		sketch = new Sketch({
			parent: createSiID(data.parent),
			svg: Buffer.alloc(0),
			paths: Buffer.alloc(0),
			owner: user.getIdForce()
		})
	}
	sketch.put("svg", Buffer.from(data.svg))
	sketch.put("paths", Buffer.from(data.paths))
	await sketch.save();

	res.send({
		...sketch.toJSON(),
		svg: sketch.get("svg").toString("base64"),
		paths: sketch.get("paths").toString("utf-8")
	})

}