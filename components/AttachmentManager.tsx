/*
 * Elijah Cobb
 * github.com/elijahjcobb
 * ejcobb@mtu.edu
 */

import {FC} from "react";
import styles from "../styles/AttachmentManager.module.scss"
import {AttachmentRow} from "./AttachmentRow";
import {Add} from "@mui/icons-material";
import {IAttachment, ISketch} from "./local-types";

export type AttachmentManagerItem = ISketch | IAttachment;

export interface SketchManagerProps {
	name: string;
	onSelect: (file: AttachmentManagerItem) => void;
	onDelete: (file: AttachmentManagerItem) => void;
	onCopy: (file: AttachmentManagerItem) => void;
	onClose: () => void;
	onNew: () => void;
	files: AttachmentManagerItem[];
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
				{props.files.map(((file, index) => {
					return <AttachmentRow
						onSelect={props.onSelect}
						onCopy={props.onCopy}
						onDelete={props.onDelete}
						file={file} key={index}/>
				}))}
			</div>
		</div>
	</div>);

};