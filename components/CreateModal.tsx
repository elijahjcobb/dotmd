/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC, useState} from "react";
import styles from "../styles/CreateModal.module.scss";

export interface CreateModalProps {
	mode: "dir" | "file"
	onCancel: () => void;
	onCreate: (value: string) => void;
}

export const CreateModal: FC<CreateModalProps> = props => {

	const [value, setValue] = useState("");

	return (<div className={styles.container}>
		<div className={styles.child}>
			<span className={styles.title}>Create new {props.mode === "dir" ? "Directory" : "File"}</span>
			<input
				onKeyDown={event => {
					if (event.key !== "Enter") return;
					props.onCreate(value);
				}}
				placeholder={"name"} className={styles.field} value={value} onChange={v => setValue(v.target.value)}/>
			<div className={styles.buttons}>
				<span onClick={props.onCancel} className={styles.cancel}>Cancel</span>
				<span onClick={() => props.onCreate(value)}>Create</span>
			</div>
		</div>
	</div>);

};
