/*
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 */

import type {GetServerSideProps, NextPage} from "next";
import React, {useCallback, useEffect, useState} from "react";
import previewStyles from "../../styles/App.module.scss";
import styles from "../../styles/Preview.module.scss";
import {Markdown} from "../../components/Markdown";
import Head from "next/head";
import {IAttachment, IFile, ISketch} from "../../components/local-types";
import {Analytics, Attachment, File, Sketch} from "../../db/DB";
import {createSiID, SiQuery} from "@element-ts/silicon";
import {NavBar} from "../../components/NavBar";
import {EditTopBarSelector} from "../../components/editor/EditTopBarSelector";
import {FileCopy, School, Work} from "@mui/icons-material";
import {EditorTopButton} from "../../components/editor/EditorTopButton";
import {useSession} from "next-auth/react";

interface PageProps {
	file: IFile;
}

const Page: NextPage<PageProps> = props => {

	const [theme, setTheme] = useState(0);

	const session = useSession();
	const user = session.data?.user;

	return <div className={styles.root}>
		<Head>
			<title>{props.file.name}</title>
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		</Head>
		<NavBar path={[]}/>
		<div className={styles.btns}>
			{user && <EditorTopButton onClick={() => {
				window.open("/api/file/clone?id=" + props.file.id, "_self");
			}}>
				<FileCopy/>
			</EditorTopButton>}
			<EditTopBarSelector value={theme} onChange={setTheme}>
				<Work/>
				<School/>
			</EditTopBarSelector>
		</div>
		<div className={styles.container}>
			<Markdown setToast={() => {}} academicTheme={theme === 1} dark={false} className={previewStyles.markdown + " " + styles.preview} value={props.file.content}/>
		</div>
	</div>
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {

	const fileId = context.query.id as string;

	const file = await SiQuery.getForId(File, createSiID(fileId));
	if (!file || !file.get("public")) return {redirect: {destination: "/preview/error?id=" + fileId, permanent: false}}

	return {
		props: {file: file.toJSON()}
	}
}

// export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
// 	return {
// 		props: {}
// 	}
// }

// export const getStaticPaths: GetStaticPaths = async () => {
// 	return {
// 		paths: [],
// 		fallback: false
// 	};
// }

export default Page;
