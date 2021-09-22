/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC, useState} from "react";
import styles from "../styles/App.module.scss";
import {Markdown} from "./Markdown";
import {useInterval, useDebounce} from "./hooks";
import moment from "moment";
import { NightsStay, WbSunny, CloudDone, CloudQueue, Error, Code, ChromeReaderMode, Description, Work, School } from "@mui/icons-material";
import { useEffect } from "react";
import Head from "next/head";
import {Editor} from "./Editor";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


export interface AppProps {
	name: string;
	profile: string;
	fileName: string;
	file: string;
	data: string;
}

enum SaveStatus {
	Unsaved,
	Saved,
	Error
}


export const App: FC<AppProps> = props => {

	const [markdown, setMarkdown] = useState(props.data);
	const [name, setName] = useState(props.fileName);
	const [lastSaved, setLastSaved] = useState(Date.now());
	const [saveMessage, setSaveMessage] = useState("Fetched");
	const [darkMode, setDarkMode] = useState(false);
	const [status, setStatus] = useState<SaveStatus>(SaveStatus.Unsaved);
	const [mode, setMode] = useState<"s" | "p" | "b">("b");

	
	useDebounce(save, 3000, [markdown]);

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
		xhr.open("POST", '/api/update', true);
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
			data: markdown,
			name,
			file: props.file
		}));
	}

	function getModeColumns(): string {
		if (mode === "s") return "100% 0%";
		else if (mode === "p") return "0% 100%";
		return "50% 50%";
	}

	return <div className={styles.App + " " + (darkMode ? styles.dark : "")}>
		<Head>
        <title>{name + ".md"}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
		<div className={styles.header}>
			<div className={styles.section}>
				<img className={styles.logo} src={"/oafa.png"} alt={"icon"}/>
				<input onBlur={save} onChange={e => setName(e.target.value)} className={styles.name} value={name} />
				{status === SaveStatus.Saved && <CloudDone className={styles.saved}/>}
				{status === SaveStatus.Unsaved && <CloudQueue className={styles.unsaved}/>}
				{status === SaveStatus.Error && <Error className={styles.saveError}/>}
				<span className={styles.save}>{saveMessage + "..."}</span>
			</div>
			<div className={styles.section}>
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
				<div className={styles.download} onClick={() => {
					window.open("https://dotmd.app/api/pdf?file=" + props.file, "_blank");
				}}><Work/></div>
				<div className={styles.download} onClick={() => {
					window.open("https://dotmd.app/api/pdf?type=academic&file=" + props.file, "_blank");
				}}><School/></div>
				<span>{props.name}</span>
				<img className={styles.profile} src={props.profile} alt={"profile"}/>
			</div>
		</div>
		<div className={styles.container} style={{gridTemplateColumns: getModeColumns()}}>
			<Editor startTyping={() => setStatus(SaveStatus.Unsaved)} dark={darkMode} className={styles.editor} value={markdown} setValue={setMarkdown}/>
			<Markdown dark={darkMode} className={styles.markdown} value={markdown}/>
		</div>
	</div>

}
