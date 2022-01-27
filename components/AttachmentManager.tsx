/*
 * Elijah Cobb
 * github.com/elijahjcobb
 * ejcobb@mtu.edu
 */

import {FC} from "react";
import styles from "../styles/AttachmentManager.module.scss"
import {AttachmentRow} from "./AttachmentRow";
import {Add} from "@mui/icons-material";

export interface SketchManagerProps {
	name: string;
	onClose: () => void;
	onDelete: (id: string) => void;
	onNew: () => void;
}

export const AttachmentManager: FC<SketchManagerProps> = props => {

	return (<div onClick={props.onClose} className={styles.container}>
		<div className={styles.modal}>
			<div className={styles.top}>
				<h2>{props.name}</h2>
				<Add onClick={e => {
					e.stopPropagation();
					props.onNew();
				}} className={styles.icon}/>
			</div>
			<div className={styles.sketches}>
				<AttachmentRow/>
				<AttachmentRow/>
				<AttachmentRow/>
				<AttachmentRow/>
				<AttachmentRow/>
				<AttachmentRow/>
			</div>
		</div>
	</div>);

};