/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import {getEmail, getUserForEmail, getUserFromAuth} from "../../../db/auth-silicon";
import {Analytics, File, SignUpInvite} from "../../../db/DB";
import {createSiID, SiQuery} from "@element-ts/silicon";

export default async (req: NextApiRequest, res: NextApiResponse) => {

	const user = await getUserFromAuth(req);
	if (!user) return res.redirect("/analytics");
	if (user.get("email") !== "ejcobb@mtu.edu") return res.redirect("/analytics");

	const {email} = req.query as {email: string};

	const invites = await SiQuery.init(SignUpInvite, {email}).getAll();
	for (const i of invites) await i.delete();

	res.redirect("/analytics");

}