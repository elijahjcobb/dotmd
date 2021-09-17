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

export interface AppProps {
	name: string;
	profile: string;
	fileName: string;
	data: string;
}

export const App: FC<AppProps> = props => {

	const [markdown, setMarkdown] = useState(props.data);

	function save() {
		const xhr = new XMLHttpRequest();
		xhr.open("POST", '/api/update', true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
				// Request finished. Do processing here.
			}
		}
		xhr.send(JSON.stringify({
			data: markdown
		}));
	}

	return <div className={styles.App}>
		<div className={styles.header}>
			<span>{props.name}</span>
			<img src={props.profile} alt={"profile"}/>
			<span>{props.fileName}</span>
			<button onClick={save}>save</button>
		</div>
		<div className={styles.container}>
			<Editor className={styles.editor} value={markdown} setValue={setMarkdown}/>
			<Markdown className={styles.markdown} value={markdown}/>
		</div>
	</div>

}
