/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC, useState} from "react";
import styles from "../styles/CreateModal.module.scss";

export interface CreateModalProps {
	title: string;
	defaultValue?: string;
	onCancel: () => void;
	onCreate: (value: string) => void;
	submitText?: string;
}

export const ModalEditor: FC<CreateModalProps> = props => {

	const [value, setValue] = useState(props.defaultValue ?? "");

	return (<div className={styles.container}>
		<div className={styles.child}>
			<span className={styles.title}>{props.title}</span>
			<input
				onKeyDown={event => {
					if (event.key !== "Enter") return;
					props.onCreate(value);
				}}
				autoFocus
				placeholder={"name"} className={styles.field} value={value} onChange={v => setValue(v.target.value)}/>
			<div className={styles.buttons}>
				<span onClick={props.onCancel} className={styles.cancel}>Cancel</span>
				<span onClick={() => props.onCreate(value)}>{props.submitText ?? "Create"}</span>
			</div>
		</div>
	</div>);

};
