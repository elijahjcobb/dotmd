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
import {IAttachment, IFile} from "../../components/local-types";
import {Analytics, File} from "../../db/DB";
import {getEmail, getUserForEmail} from "../../db/auth-silicon";
import {createSiID, SiQuery} from "@element-ts/silicon";
import {CircularProgress} from "@mui/material";
import {AttachmentManager} from "../../components/AttachmentManager";
import {EditorTopBar} from "../../components/editor/EditorTopBar";
import {EditorMode} from "../../components/editor/EditorModePicker";

interface PageProps {
	file: IFile;
}

export enum SaveStatus {
	Unsaved,
	Saved,
	Error
}


const Page: NextPage<PageProps> = props => {

	const [markdown, setMarkdown] = useState(props.file.content);
	const [name, setName] = useState(props.file.name);
	const [lastSaved, setLastSaved] = useState(Date.now());
	const [saveMessage, setSaveMessage] = useState("Fetched");
	const [darkMode, setDarkMode] = useState(false);
	const [status, setStatus] = useState<SaveStatus>(SaveStatus.Unsaved);
	const [mode, setMode] = useState<EditorMode>(EditorMode.SPLIT);
	const [academicTheme, setAcademicTheme] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [sketching, setSketching] = useState(false);
	const [imaging, setImaging] = useState(false);

	useEffect(() => {
		if (/Mobi|Android/i.test(navigator.userAgent)) setMode(EditorMode.PREVIEW);
		else setMode(window.innerWidth > 720 ? EditorMode.SPLIT : EditorMode.PREVIEW)
	}, []);
	useDebounce(save, 500, [markdown]);

	useInterval(() => {
		const a = moment(Date.now());
		const b = moment(lastSaved);
		setSaveMessage(b.from(a))
	}, 1000)

	useEffect(() => {
		setStatus(SaveStatus.Unsaved)
	}, [markdown])

	function save() {
		const xhr = new XMLHttpRequest();
		xhr.open("POST", '/api/file/update', true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				// Request finished. Do processing here.
				if (this.status === 200) {
					setLastSaved(Date.now())
					setStatus(SaveStatus.Saved);
				} else {
					setStatus(SaveStatus.Error);
					alert("API responded with error: " + this.status)
				}
			}
		}
		xhr.send(JSON.stringify({
			content: markdown,
			id: props.file.id,
			name
		}));
	}

	function getModeColumns(): string {
		if (mode === EditorMode.SOURCE) return "100% 0%";
		else if (mode === EditorMode.PREVIEW) return "0% 100%";
		return "50% 50%";
	}

	const openFolder = () => {
		window.open("/view/" + props.file.parent, "_self")
	}

	const onOpenFile = useCallback(() => {
		const filePicker = document.getElementById("file") as HTMLInputElement | null;
		if (!filePicker) return;
		filePicker.click();
		filePicker.onchange = () => {
			const file = (filePicker.files ?? [])[0]
			if (file) {
				setUploading(true);
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => {
					const imageData = reader.result as string;
					const xhr = new XMLHttpRequest();
					xhr.open("POST", '/api/attachment/create', true);
					xhr.setRequestHeader("Content-Type", "application/json");
					xhr.onreadystatechange = function() {
						if (this.readyState === XMLHttpRequest.DONE) {
							// Request finished. Do processing here.
							if (this.status === 200) {
								const res = JSON.parse(this.responseText) as IAttachment;
								navigator.clipboard.writeText(`![image](/api/attachment/view/${res.id})`).then(() => {
									setUploading(false);
								})
							} else {
								console.error(this.status, this.statusText)
								alert("Image upload to dotmd.app filed.")
								setUploading(false);
							}
						}
					}
					xhr.send(JSON.stringify({
						content: imageData,
						id: props.file.id,
						mime: file.type
					}));

				};
				reader.onerror = function (error) {
					console.log('Error: ', error);
					alert("Failed to upload file data.")
					setUploading(false);
				};
			}
		}
	}, [props.file.id])

	return <div className={styles.App + " " + (darkMode ? styles.dark : "")}>
		<Head>
			<title>{name + ".md"}</title>
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		</Head>
		{ uploading && <div className={styles.loading}>
			<div>
				<span>Uploading Image</span>
				<CircularProgress/>
			</div>
		</div>}
		<input accept={".png,.jpg,.jpeg,.gif"} id={"file"} type={"file"} style={{display: "none"}}/>
		{sketching && <AttachmentManager
			onDelete={() => {}}
			onNew={() => {

			}}
			name={"Sketches"}
			onClose={() => setSketching(false)}
		/>}
		{imaging && <AttachmentManager
			onDelete={() => {}}
			onNew={() => {
				onOpenFile();
			}}
			name={"Images"}
			onClose={() => setImaging(false)}
		/>}
		<EditorTopBar
			openFolder={openFolder}
			openFile={onOpenFile}
			saveStatus={status}
			saveMessage={saveMessage}
			mode={mode}
			setMode={setMode}
			darkMode={darkMode}
			setDarkMode={setDarkMode}
			academicTheme={academicTheme}
			setAcademicTheme={setAcademicTheme}
			title={name}
			setTitle={setName}
			updateDoc={save}
		/>
		<div className={styles.container} style={{gridTemplateColumns: getModeColumns()}}>
			<Editor startTyping={() => setStatus(SaveStatus.Unsaved)} dark={darkMode} className={styles.editor} value={markdown} setValue={setMarkdown}/>
			<Markdown academicTheme={academicTheme} dark={darkMode} className={styles.markdown} value={markdown}/>
		</div>
	</div>
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {

	const fileId = context.query.id as string;
	const email = await getEmail(context);
	const user = await getUserForEmail(email);
	if (!user) return {redirect: {destination: "/", permanent: false}}

	const file = await SiQuery.getForId(File, createSiID(fileId));
	if (!file || file.get("owner").toHexString() !== user.getHexId()) return {redirect: {destination: "/", permanent: false}}

	await (new Analytics({
		user: user.getIdForce(),
		targetId: file.getIdForce(),
		targetType: "file",
		actionType: "view"
	})).save();

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
