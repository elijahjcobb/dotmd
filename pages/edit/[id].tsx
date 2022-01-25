/*
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 */

import type {NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps} from "next";
import React, {FC, useState, useEffect, useCallback} from "react";
import styles from "../../styles/App.module.scss";
import {Markdown} from "../../components/Markdown";
import {useInterval, useDebounce} from "../../components/hooks";
import moment from "moment";
import {
	NightsStay,
	WbSunny,
	CloudDone,
	CloudQueue,
	Error,
	Code,
	ChromeReaderMode,
	Description,
	Work,
	School,
	Folder, Image
} from "@mui/icons-material";
import Head from "next/head";
import {Editor} from "../../components/Editor";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {IAttachment, IFile} from "../../components/local-types";
import {File} from "../../db/DB";
import {getEmail, getUserForEmail, getUserFromAuth} from "../../db/auth-silicon";
import {SiQuery} from "@element-ts/silicon";
import {ObjectId} from "bson";
import {NavBar} from "../../components/NavBar";
import {useSession} from "next-auth/react";
import {CircularProgress} from "@mui/material";

interface PageProps {
	file: IFile;
}

enum SaveStatus {
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
	const [mode, setMode] = useState<"s" | "p" | "b">("b");
	const [academicTheme, setAcademicTheme] = useState(false);
	const [uploading, setUploading] = useState(false);

	const session = useSession();
	const user: string = session.data?.user?.image ?? "";

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
		if (mode === "s") return "100% 0%";
		else if (mode === "p") return "0% 100%";
		return "50% 50%";
	}

	const openFolder = () => {
		window.open("/view/" + props.file.parent, "_self")
	}

	const onOpenFile = useCallback(() => {
		setUploading(true);
		const filePicker = document.getElementById("file") as HTMLInputElement | null;
		if (!filePicker) return;
		filePicker.click();
		filePicker.onchange = () => {
			const file = (filePicker.files ?? [])[0]
			if (file) {
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
		<div className={styles.header}>
			<div className={styles.section}>
				<img className={styles.logo} src={"/oafa.png"} alt={"icon"}/>
				<Folder onClick={openFolder} className={styles.folder}/>
				<span className={styles.sep}>/</span>
				<input onBlur={save} onChange={e => setName(e.target.value)} className={styles.name} value={name} />
			</div>
			<div className={styles.section}>
				{status === SaveStatus.Saved && <CloudDone className={styles.saved}/>}
				{status === SaveStatus.Unsaved && <CloudQueue className={styles.unsaved}/>}
				{status === SaveStatus.Error && <Error className={styles.saveError}/>}
				<span className={styles.save}>{saveMessage + "..."}</span>
				<div className={styles.upload} onClick={onOpenFile}>
					<input accept={".png,.jpg,.jpeg,.gif"} id={"file"} type={"file"} style={{display: "none"}}/>
					<Image/>
				</div>
				<ToggleButtonGroup
					className={styles.picker}
					value={mode}
					exclusive
					onChange={(
						event: React.MouseEvent<HTMLElement>,
						newValue: "s" | "b" | "p"
					) => {
						setMode(newValue ?? "b");
					}}
				>
					<ToggleButton value={"s"}>
						<Code />
					</ToggleButton>
					<ToggleButton value={"b"}>
						<ChromeReaderMode />
					</ToggleButton>
					<ToggleButton value={"p"}>
						<Description />
					</ToggleButton>
				</ToggleButtonGroup>
				<ToggleButtonGroup
					className={styles.picker}
					value={darkMode ? "n" : "d"}
					exclusive
					onChange={(
						event: React.MouseEvent<HTMLElement>,
						newValue: "d" | "n"
					) => {
						setDarkMode(newValue === "n");
					}}
				>
					<ToggleButton value={"d"}>
						<WbSunny />
					</ToggleButton>
					<ToggleButton value={"n"}>
						<NightsStay />
					</ToggleButton>
				</ToggleButtonGroup>
				<ToggleButtonGroup
					className={styles.picker}
					value={academicTheme ? "a" : "w"}
					exclusive
					onChange={(
						event: React.MouseEvent<HTMLElement>,
						newValue: "w" | "a"
					) => {
						setAcademicTheme(newValue === "a");
					}}
				>
					<ToggleButton value={"w"}>
						<Work />
					</ToggleButton>
					<ToggleButton value={"a"}>
						<School />
					</ToggleButton>
				</ToggleButtonGroup>
				<img className={styles.profile} src={user} alt={"profile"}/>
			</div>
		</div>
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

	const query = new SiQuery(File, {_id: new ObjectId(fileId)})
	const file = await query.getFirst();
	if (!file || file.get("owner") !== user.getHexId()) return {redirect: {destination: "/", permanent: false}}

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
