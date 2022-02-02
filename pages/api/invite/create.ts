/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import {getEmail, getUserForEmail, getUserFromAuth} from "../../../db/auth-silicon";
import {Analytics, File, SignUpInvite} from "../../../db/DB";
import {createSiID} from "@element-ts/silicon";

export default async (req: NextApiRequest, res: NextApiResponse) => {

	const user = await getUserFromAuth(req);
	if (!user) return res.redirect("/analytics");
	if (user.get("email") !== "ejcobb@mtu.edu") return res.redirect("/analytics");

	const {email} = req.query as {email: string};

	const invite = new SignUpInvite({
		used: false,
		email
	});

	await invite.save();

	res.redirect("/analytics");

}