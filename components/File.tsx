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

export interface FileProps {
	file: IFile;
	onSelect?: () => void;
	onEdit: (file: IFile) => void;
	onDelete: (file: IFile) => void;
}

export const File: FC<FileProps> = props => {

	const d = new Date(props.file.updatedAt);
	const date = d.toLocaleDateString();
	const time = d.toLocaleTimeString();
	const lastUpdated = date + " " + time;

	return (<div onClick={props.onSelect} className={styles.container}>
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
