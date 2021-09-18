/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC} from "react";
import styles from "../styles/App.module.scss";
import {UnControlled as CodeMirror} from "react-codemirror2";
import {useDebounce, useInterval, useTimeout} from "./hooks";

export interface Editor2Props {
	darkMode: boolean;
	initialValue: string;
	onSave(value: string): void;
}

export const Editor2: FC<Editor2Props> = props => {

	let value = props.initialValue;

	const {reset} = useInterval(() => {
		props.onSave(value);
	}, 10);

	return <CodeMirror
		className={styles.editor}
		value={props.initialValue}
		options={{
			mode: 'text',
			theme: props.darkMode ? "3024-night" : "eclipse",
			lineNumbers: true,
			lineWrapping: true,
			indentWithTabs: true
		}}
		onKeyUp={reset}
		onChange={(editor, data, v) => {
			// props.onSave(value);
			value = v;
		}}
	/>

}
