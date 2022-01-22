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
import {IDirectory, IFile} from "../components/types";
import styles from "../styles/HomePage.module.scss"
import {getCollectionDirectories, getCollectionFiles, getCollectionUser} from "../db/DB";

interface PageProps {
	directories: IDirectory[];
	files: IFile[];
}

const Page: NextPage<PageProps> = props => {

	const signedIn = useSession().status === "authenticated";

	return (
		<div className={styles.container}>
			<NavBar/>
			{signedIn ? <DirectoryPage
				directories={props.directories}
				files={props.files}
			/> : <div>
				<span>About info here... (sign in for this to go away)</span>
			</div>}
		</div>
	);
};

async function getEmail(context: GetServerSidePropsContext<ParsedUrlQuery>): Promise<string | undefined> {
	const session = await getSession({req: context.req});
	return session?.user?.email ?? undefined;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {

	const email = await getEmail(context);

	if (!email) return {props: {directories: [], files: []}}
	const users = await getCollectionUser();
	const user = await users.findOne({email});
	if (!user) await users.insertOne({email})
	const userId = (user._id.id as Buffer).toString("hex");

	console.log(userId);

	const directoriesCol = await getCollectionDirectories();
	const filesCol = await getCollectionFiles();

	const dirsRaw = await directoriesCol.find({parent: email}).toArray();
	const filesRaw = await filesCol.find({parent: email}).toArray();

	const directories: IDirectory[] = dirsRaw.map(dir => {
		console.log(dir)
		return {
			name: dir.name,
			id: "dfew"
		}
	})

	const files: IFile[] = filesRaw.map(file => {
		return {
			name: file.name,
			lastUpdated: Date.now(),
			id: "dfew"
		}
	});

	return {props: {directories, files}}

}


export default Page;
