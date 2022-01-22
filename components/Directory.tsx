/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC} from "react";
import FolderIcon from '@mui/icons-material/Folder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styles from "../styles/Directory.module.scss";
import {IDirectory} from "./local-types";

export interface DirectoryProps {
	directory: IDirectory;
	onSelect: (dir: IDirectory) => void;
	onOptionSelect: (dir: IDirectory) => void;
}

export const Directory: FC<DirectoryProps> = props => {

	const onClick = () => props.onSelect(props.directory);
	const onOptionClick = () => props.onOptionSelect(props.directory);

	console.log(props.directory)

	return (<div onClick={onClick} className={styles.container}>
		<FolderIcon/>
		<span className={styles.name}>{props.directory.name}</span>
		<MoreVertIcon
			onClick={ev => {
				ev.stopPropagation();
				onOptionClick();
			}}
			className={styles.option}
		/>
	</div>);

};
