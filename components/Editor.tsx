
/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC, useEffect, useState} from "react";
import Monaco from "@monaco-editor/react";
import styles from "../styles/Editor.module.scss";
import {useDebounce, useInterval} from "./hooks";


export interface EditorProps {
	dark: boolean;
	value: string;
	className?: string;
	setValue: (value: string) => void;
	startTyping: () => void;
}

export const Editor: FC<EditorProps> = props => {

	const [source, setSource] = useState(props.value);

	useEffect(() => {
		props.startTyping();
	}, [source])

	useDebounce(() => {
		props.setValue(source);
	}, 500, [source]);

	return <Monaco
		className={(props.className ?? "") + " " + styles.Editor}
		theme={props.dark ? "vs-dark" : "vs-light"}
		defaultLanguage="markdown"
		value={source}
		options={{
			wordWrap: "on",
			tabCompletion: "off",
			smoothScrolling: "on",
			minimap: {
				enabled: false
			},
			snippetSuggestions: "none",
			suggest: {
				wordBasedSuggestions: false
			}
		}}
		onChange={(value, ev) => setSource(value ?? "")}
	/>;

}