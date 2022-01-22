/*
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 */

import {getSession, useSession} from "next-auth/react";
import type {NextPage, GetServerSideProps, GetServerSidePropsContext} from "next";
import {DirectoryPage} from "../components/DirectoryPage";
import {NavBar} from "../components/NavBar";
import {ParsedUrlQuery} from "querystring";
import styles from "../styles/HomePage.module.scss"
import {Directory, FileProps, DirectoryProps, User, File} from "../db/DB";
import {SiQuery} from "@element-ts/silicon";
import {getEmail} from "../db/auth-silicon";
import {IDirectory, IFile} from "../components/local-types";

interface PageProps {
	id: string;
	directories: IDirectory[];
	files: IFile[];
}

const Page: NextPage<PageProps> = props => {

	const signedIn = useSession().status === "authenticated";

	return (
		<div className={styles.container}>
			<NavBar/>
			{signedIn ? <DirectoryPage
				id={props.id}
				directories={props.directories}
				files={props.files}
			/> : <div>
				<span>About info here... (sign in for this to go away)</span>
			</div>}
		</div>
	);
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {

	const email = await getEmail(context);

	if (!email) return {props: {directories: [], files: []}}
	let user = await (new SiQuery(User, {email})).getFirst();
	if (!user) {
		user = new User({email});
		await user.save();
	}
	const directories = await (new SiQuery(Directory, {parent: user.getHexId(), owner: user.getHexId()})).getAll();
	const files = await (new SiQuery(File, {parent: user.getHexId(), owner: user.getHexId()})).getAll();

	return {props: {
		directories: directories.map(v => v.toJSON()), files: files.map(v => v.toJSON()), id: user.getHexId()
	}}

}


export default Page;
