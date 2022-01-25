/*
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 */

import type {GetServerSideProps, } from 'next';
import {Directory, User} from "../db/DB";
import {getEmail} from "../db/auth-silicon";
import {SiQuery} from "@element-ts/silicon";
import {NextPage} from "next";

interface PageProps {

}

const Page: NextPage = () => {
	return (
		<span>never see me</span>
	);
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {

	const email = await getEmail(context);

	if (!email) return { redirect: {destination: "/about", permanent: false}}
	let user = await (new SiQuery(User, {email})).getFirst();
	if (!user) {
		user = new User({email});
		await user.save();
	}

	let dir = await (new SiQuery(Directory, {owner: user.getHexId(), parent: user.getHexId()}).getFirst());
	if (!dir) {
		dir = new Directory({
			name: "root",
			parent: user.getHexId(),
			owner: user.getHexId()
		})
		await dir.save();
	}

	return { redirect: {destination: "/view/" + dir.getHexId(), permanent: false}}
}

export default Page;
