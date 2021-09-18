/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC} from "react";
import Monaco from "@monaco-editor/react";
import styles from "../styles/Editor.module.scss";


export interface EditorProps {
	dark: boolean;
	value: string;
	className?: string;
	setValue: (value: string) => void;
}

export const Editor: FC<EditorProps> = props => {

	return <Monaco
		className={(props.className ?? "") + " " + styles.Editor}
		theme={props.dark ? "vs-dark" : "vs-light"}
		defaultLanguage="markdown"
		value={props.value}
		onChange={(value, ev) => props.setValue(value ?? "")}
	/>;

}
