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
	submitText?: string;
	onCancel: () => void;
	onSubmit: () => void;
}

export const Modal: FC<CreateModalProps> = props => {

	const [value, setValue] = useState("");

	return (<div className={styles.container}>
		<div className={styles.child}>
			<span className={styles.title}>{props.title}</span>
			<div className={styles.buttons}>
				<span onClick={props.onCancel} className={styles.cancel}>Cancel</span>
				<span onClick={props.onSubmit}>{props.submitText ?? "Submit"}</span>
			</div>
		</div>
	</div>);

};
