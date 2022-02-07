/*
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 */

import type {GetServerSideProps, NextPage} from "next";
import React, {useCallback, useEffect, useState} from "react";
import styles from "../../styles/App.module.scss";
import {Markdown} from "../../components/Markdown";
import {useDebounce, useInterval} from "../../components/hooks";
import moment from "moment";
import Head from "next/head";
import {Editor} from "../../components/Editor";
import {IAttachment, IFile, ISketch} from "../../components/local-types";
import {Analytics, Attachment, File, Sketch} from "../../db/DB";
import {getEmail, getUserForEmail} from "../../db/auth-silicon";
import {createSiID, SiQuery} from "@element-ts/silicon";
import {CircularProgress} from "@mui/material";
import {AttachmentManager} from "../../components/AttachmentManager";
import {EditorTopBar} from "../../components/editor/EditorTopBar";
import {EditorMode} from "../../components/editor/EditorModePicker";
import {Toast, ToastConfig} from "../../components/Toast";
import {Sketch as SketchEditor} from "../../components/editor/Sketch";
import {NavBar} from "../../components/NavBar";

interface PageProps {
	file: IFile;
}

const Page: NextPage<PageProps> = props => {

	return <div className={styles.App}>
		<Head>
			<title>Preview {props.file.name + ".md"}</title>
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		</Head>
		<NavBar path={[]}/>
		<Markdown setToast={() => {}} academicTheme={false} dark={false} className={styles.markdown} value={props.file.content}/>
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
