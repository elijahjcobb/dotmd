/*
 * Elijah Cobb
 * github.com/elijahjcobb
 * ejcobb@mtu.edu
 */

import {FC} from "react";
import styles from "../styles/AttachmentRow.module.scss";
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import DeleteIcon from '@mui/icons-material/Delete';
import {AttachmentManagerItem} from "./AttachmentManager";

export interface SketchRowProps {
	file: AttachmentManagerItem;
	onSelect: (file: AttachmentManagerItem) => void;
	onDelete: (file: AttachmentManagerItem) => void;
	onCopy: (file: AttachmentManagerItem) => void;
}

export const AttachmentRow: FC<SketchRowProps> = props => {

	const getSrc = () => {
		//@ts-ignore
		const prefix = (props.file.hasOwnProperty("svg")) ? "svg+xml" : "png";
		//@ts-ignore
		const img = (props.file.hasOwnProperty("svg")) ? props.file.svg : props.file.content;
		return `data:image/${prefix};base64,` + img;
	}

	return (<div className={styles.container}>
		<img onClick={() => props.onSelect(props.file)} className={styles.preview} alt={"sketch"} src={getSrc()}/>
		<div className={styles.options}>
			<InsertLinkIcon onClick={() => props.onCopy(props.file)} className={styles.copy}/>
			<DeleteIcon onClick={() => {
				const x = window.confirm("Are you sure you want to delete?");
				if (!x) return;
				props.onDelete(props.file)
			}} className={styles.delete}/>
		</div>
	</div>);

};