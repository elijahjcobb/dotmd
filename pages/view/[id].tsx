/*
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 */

import {getSession, useSession} from "next-auth/react";
import type {NextPage, GetServerSideProps, GetServerSidePropsContext} from "next";
import {DirectoryPage} from "../../components/DirectoryPage";
import {NavBar} from "../../components/NavBar";
import styles from "../../styles/HomePage.module.scss"
import {Directory, FileProps, DirectoryProps, User, File} from "../../db/DB";
import {SiQuery} from "@element-ts/silicon";
import {getEmail} from "../../db/auth-silicon";
import {IDirectory, IFile} from "../../components/local-types";
import {ObjectId} from "bson";

interface PageProps {
	dir: IDirectory;
	path: IDirectory[];
	directories: IDirectory[];
	files: IFile[];
}

const Page: NextPage<PageProps> = props => {

	const signedIn = useSession().status === "authenticated";

	return (
		<div className={styles.container}>
			<NavBar path={props.path}/>
			{signedIn ? <DirectoryPage
				id={props.dir.id}
				directories={props.directories}
				files={props.files}
			/> : <div>
			</div>}
		</div>
	);
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {

	const email = await getEmail(context);
	const id = context.query.id as string;
	if (!email) return {redirect: {destination: "/", permanent: false}}
	let user = await (new SiQuery(User, {email})).getFirst();
	if (!user) return { redirect: { destination: "/", permanent: false }}
	const dir = await (new SiQuery(Directory, {_id: new ObjectId(id)})).getFirst();
	if (!dir) return { redirect: { destination: "/e", permanent: false }}
	const directories = await (new SiQuery(Directory, {parent: id, owner: user.getHexId()})).getAll();
	const files = await (new SiQuery(File, {parent: id, owner: user.getHexId()})).getAll();

	let path: IDirectory[] = [dir.toJSON()];
	let atRoot = false;
	let c = 0;
	while (!atRoot) {
		const lastDir = path[path.length - 1];
		const dir = await (new SiQuery(Directory, {_id: new ObjectId(lastDir.parent)})).getFirst();
		if (dir) {
			path.push(dir.toJSON());
		} else {
			atRoot = true;
		}
		c++;
		if (c > 20) atRoot = true;
	}

	path = path.reverse();
	if (path[0].name === "root") path[0].name = "home"

	return {props: {
			directories: directories.map(v => v.toJSON()),
			files: files.map(v => v.toJSON()),
			dir: dir.toJSON(),
			path
	}}

}


export default Page;
