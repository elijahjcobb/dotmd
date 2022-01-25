/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC} from "react";
import FolderIcon from '@mui/icons-material/Folder';
import styles from "../styles/Directory.module.scss";
import {IDirectory} from "./local-types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export interface DirectoryProps {
	directory: IDirectory;
	onSelect: (dir: IDirectory) => void;
	onEdit: (dir: IDirectory) => void;
	onDelete: (dir: IDirectory) => void;
}

export const Directory: FC<DirectoryProps> = props => {

	return (<div onClick={() => props.onSelect(props.directory)} className={styles.container}>
		<FolderIcon/>
		<span className={styles.name}>{props.directory.name}</span>
		<EditIcon
			onClick={ev => {
				ev.stopPropagation();
				props.onEdit(props.directory);
			}}
			className={styles.option}
		/>
		<DeleteIcon
			onClick={ev => {
				ev.stopPropagation();
				props.onDelete(props.directory);
			}}
			className={styles.option}
		/>
	</div>);

};
