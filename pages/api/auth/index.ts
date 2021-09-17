/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import type { NextApiRequest, NextApiResponse } from "next"
import {createAuthURL, createClient} from "../../../api/google";

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const client = createClient();
	res.redirect(createAuthURL(client));
}
