/*
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 */

import type {GetServerSideProps, NextPage} from "next";
import React, {useCallback, useEffect, useState} from "react";
import styles from "../../styles/App.module.scss";
import previewStyles from "../../styles/Preview.module.scss";
import {Markdown} from "../../components/Markdown";
import Head from "next/head";
import {IAttachment, IFile, ISketch} from "../../components/local-types";
import {Analytics, Attachment, File, Sketch} from "../../db/DB";
import {createSiID, SiQuery} from "@element-ts/silicon";
import {NavBar} from "../../components/NavBar";

interface PageProps {
	file: IFile;
}

const Page: NextPage<PageProps> = props => {

	return <div className={styles.App}>
		<Head>
			<title>Previewing {"'" + props.file.name + ".md'"}</title>
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		</Head>
		<NavBar path={[]}/>
		<Markdown setToast={() => {}} academicTheme={false} dark={false} className={styles.markdown + " " + previewStyles.preview} value={props.file.content}/>
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
