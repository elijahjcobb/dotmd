/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC, MutableRefObject, useRef, useState} from "react";
import styles from "../styles/App.module.scss";
import {Markdown} from "./Markdown";
import {useInterval, useDebounce} from "./hooks";
import moment from "moment";
import { CheckCircle, NightsStay, WbSunny, Circle } from "@mui/icons-material";
import { useEffect } from "react";
import Head from "next/head";
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/theme/eclipse.css';
import { Markdown2 } from "./Markdown2";
import {Editor2} from "./Editor2";
import {Editor} from "./Editor";


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
	const [saved, setSaved] = useState(true);
	
	useDebounce(save, 2000, [markdown]);

	useInterval(() => {
		const a = moment(Date.now());
		const b = moment(lastSaved);
		setSaveMessage("Last saved " + b.from(a) + "...")
	}, 1000)

	useEffect(() => {
		setSaved(false);
	}, [markdown])

	console.log("RE-RENDER");

	function save() {
		const xhr = new XMLHttpRequest();
		xhr.open("POST", '/api/update', true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
				// Request finished. Do processing here.
				setLastSaved(Date.now())
				setSaved(true);
			}
		}
		xhr.send(JSON.stringify({
			data: markdown,
			name 
		}));
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
				{saved ? <CheckCircle/> : <Circle/>}
				<span onClick={save} className={styles.save}>{saveMessage}</span>
			</div>
			<div className={styles.section}>
				<div className={styles.themeButton} onClick={() => setDarkMode(v => !v)}>{darkMode ? <WbSunny/> : <NightsStay/>}</div>
				<span>{props.name}</span>
				<img className={styles.profile} src={props.profile} alt={"profile"}/>
			</div>
		</div>
		<div className={styles.container}>
			{/*<Editor2 initialValue={props.data} darkMode={darkMode} onSave={v => preview.current?.setMarkdown(v)}/>*/}
			<Editor dark={darkMode} className={styles.editor} value={markdown} setValue={setMarkdown}/>
			<Markdown dark={darkMode} className={styles.markdown} value={markdown}/>
			{/*<Markdown2 ref={preview as MutableRefObject<Markdown2>} dark={darkMode} className={styles.markdown} value={markdown}/>*/}
		</div>
	</div>

}
