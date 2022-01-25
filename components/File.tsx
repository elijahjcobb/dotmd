/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC} from "react";
import styles from "../styles/File.module.scss";
import ArticleIcon from '@mui/icons-material/Article';
import {IFile} from "./local-types";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {DragPreviewImage, useDrag, useDrop} from "react-dnd";

export interface FileProps {
	file: IFile;
	onSelect?: () => void;
	onEdit: (file: IFile) => void;
	onDelete: (file: IFile) => void;
}

export interface DropResult {
	id: string
}

export const File: FC<FileProps> = props => {

	const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
		// "type" is required. It is used by the "accept" specification of drop targets.
		type: 'BOX',
		// The collect function utilizes a "monitor" instance (see the Overview for what this is)
		// to pull important pieces of state from the DnD system.
		collect: (monitor) => ({
			isDragging: monitor.isDragging()
		}),
		end: (item, monitor) => {
			const dropResult = monitor.getDropResult<DropResult>()
			if (item && dropResult) {
				const src = props.file.id;
				const dest = dropResult.id;
				if (props.file.parent === dest) return;
				window.open("/api/file/move?src=" + src + "&dest=" + dest, "_self");
			}
		},
	}))

	const d = new Date(props.file.updatedAt);
	const date = d.toLocaleDateString();
	const time = d.toLocaleTimeString();
	const lastUpdated = date + " " + time;

	return (<div ref={drag} onClick={props.onSelect} className={styles.container}>
		<DragPreviewImage connect={dragPreview} src={"/article.png"} />
		<ArticleIcon/>
		<span className={styles.name}>{props.file.name}</span>
		<span className={styles.date}>{lastUpdated}</span>
		<EditIcon
			onClick={ev => {
				ev.stopPropagation();
				props.onEdit(props.file);
			}}
			className={styles.option}
		/>
		<DeleteIcon
			onClick={ev => {
				ev.stopPropagation();
				props.onDelete(props.file);
			}}
			className={styles.option}
		/>
	</div>);

};
