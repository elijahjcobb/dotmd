/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC} from "react";
import styles from "../styles/DirectoryPage.module.scss";
import {DirectoryContainer} from "./DirectoryContainer";
import {FilesContainer} from "./FilesContainer";
import {IDirectory, IFile} from "./types";
import AddIcon from '@mui/icons-material/Add';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

export interface DirectoryPageProps {
	directories: IDirectory[];
	files: IFile[];
}

export const DirectoryPage: FC<DirectoryPageProps> = props => {

	const onFileSelect = (file: IFile) => {
		console.log("Select:", file);
	}

	const onDirectorySelect = (directory: IDirectory) => {
		console.log("Select:", directory);
	}

	const onDirectoryOptionsSelect = (directory: IDirectory) => {
		console.log("Option:", directory);
	}

	return (<div className={styles.container}>
		<DirectoryContainer
			onSelect={onDirectorySelect}
			onOptionSelect={onDirectoryOptionsSelect}
			directories={props.directories}/>
		<FilesContainer onSelect={onFileSelect} files={props.files}/>
		<div className={styles.add}>
			<AddIcon className={styles.addButton}/>
		</div>
		<div className={styles.folder}>
			<CreateNewFolderIcon className={styles.folderButton}/>
		</div>
	</div>);

};
