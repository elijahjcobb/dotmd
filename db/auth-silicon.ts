/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {User} from "./DB";
import {getSession} from "next-auth/react";
import {GetServerSidePropsContext, NextApiRequest} from "next";
import {SiQuery} from "@element-ts/silicon";
import {ParsedUrlQuery} from "querystring";

export async function getEmail(context: GetServerSidePropsContext<ParsedUrlQuery>): Promise<string | undefined> {
	const session = await getSession({req: context.req});
	return session?.user?.email ?? undefined;
}

export async function getEmailFromReq(req: NextApiRequest): Promise<string | undefined> {
	const session = await getSession({req});
	return session?.user?.email ?? undefined;
}

export async function getUserForEmail(email?: string): Promise<User | undefined> {
	if (!email) return undefined;
	const query = new SiQuery(User, {email});
	return await query.getFirst();
}

export async function getUserFromAuth(req: NextApiRequest): Promise<User | undefined> {

	const session = await getSession({req});
	const email: string | undefined = session?.user?.email ?? undefined;
	if (!email) return undefined;
	const query = new SiQuery(User, {email});
	return await query.getFirst();

}