/*
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 */

import {getSession, useSession} from "next-auth/react";
import type {NextPage, GetServerSideProps, GetServerSidePropsContext} from "next";
import {DirectoryPage} from "../../components/DirectoryPage";
import {NavBar} from "../../components/NavBar";
import {ParsedUrlQuery} from "querystring";
import styles from "../../styles/HomePage.module.scss"
import {Directory, FileProps, DirectoryProps, User, File} from "../../db/DB";
import {SiQuery} from "@element-ts/silicon";
import {getEmail} from "../../db/auth-silicon";

interface PageProps {
	id: string;
	directories: DirectoryProps[];
	files: FileProps[];
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
	const id = context.query.id as string;
	if (!email) return {props: {directories: [], files: []}}
	let user = await (new SiQuery(User, {email})).getFirst();
	if (!user) return { redirect: { destination: "/", permanent: false }}
	const directories = await (new SiQuery(Directory, {parent: id, owner: user.getHexId()})).getAll();
	const files = await (new SiQuery(File, {parent: id, owner: user.getHexId()})).getAll();

	return {props: {
			directories: directories.map(v => v.toJSON()), files: files.map(v => v.toJSON()), id
		}}

}


export default Page;
