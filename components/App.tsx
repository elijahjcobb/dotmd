/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC, useState} from "react";
import styles from "../styles/App.module.scss";
import {Editor} from "./Editor";
import {Markdown} from "./Markdown";
import {useInterval, useDebounce} from "./hooks";
import moment from "moment";
import { NightsStay, WbSunny } from "@mui/icons-material";

export interface AppProps {
	name: string;
	profile: string;
	fileName: string;
	data: string;
}

export const App: FC<AppProps> = props => {

	const [markdown, setMarkdown] = useState(props.data);
	const [name, setName] = useState(props.fileName);
	const [lastSaved, setLastSaved] = useState(Date.now());
	const [saveMessage, setSaveMessage] = useState("Fetched");
	const [darkMode, setDarkMode] = useState(false);
	
	useDebounce(save, 3000, [markdown]);

	useInterval(() => {
		var a = moment(Date.now());
		var b = moment(lastSaved);
		setSaveMessage("Last saved " + b.from(a) + "...")
	}, 1000)

	function save() {
		const xhr = new XMLHttpRequest();
		xhr.open("POST", '/api/update', true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
				// Request finished. Do processing here.
				setLastSaved(Date.now())
			}
		}
		xhr.send(JSON.stringify({
			data: markdown,
			name 
		}));
	}

	return <div className={styles.App + " " + (darkMode ? styles.dark : "")}>
		<div className={styles.header}>
			<div className={styles.section}>
				<img className={styles.logo} src={"/oafa.png"} alt={"icon"}/>
				<input onBlur={save} onChange={e => setName(e.target.value)} className={styles.name} value={name} />
				<span onClick={save} className={styles.save}>{saveMessage}</span>
			</div>
			<div className={styles.section}>
				<div className={styles.themeButton} onClick={() => setDarkMode(v => !v)}>{darkMode ? <WbSunny/> : <NightsStay/>}</div>
				<span>{props.name}</span>
				<img className={styles.profile} src={props.profile} alt={"profile"}/>
			</div>
		</div>
		<div className={styles.container}>
			<Editor dark={darkMode} className={styles.editor} value={markdown} setValue={setMarkdown}/>
			<Markdown dark={darkMode} className={styles.markdown} value={markdown}/>
		</div>
	</div>

}
