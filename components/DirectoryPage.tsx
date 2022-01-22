/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC, useCallback, useState} from "react";
import styles from "../styles/DirectoryPage.module.scss";
import {DirectoryContainer} from "./DirectoryContainer";
import {FilesContainer} from "./FilesContainer";
import AddIcon from '@mui/icons-material/Add';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import {DirectoryProps, FileProps} from "../db/DB";
import {CreateModal} from "./CreateModal";
import {IDirectory, IFile} from "./local-types";

export interface DirectoryPageProps {
	id: string;
	directories: IDirectory[];
	files: IFile[];
}

export const DirectoryPage: FC<DirectoryPageProps> = props => {

	const onFileSelect = (file: IFile) => {
		console.log("Select:", file);
		window.open(`/edit/${file.id}`, "_self");
	}

	const onDirectorySelect = (directory: IDirectory) => {
		console.log("Select:", directory);
		window.open(`/view/${directory.id}`, "_self");
	}

	const onDirectoryOptionsSelect = (directory: IDirectory) => {
		console.log("Option:", directory);
	}

	const [creator, setCreator] = useState<"dir" | "file" | undefined>(undefined);

	return (<div className={styles.container}>
		{props.directories.length > 0 && <DirectoryContainer
			onSelect={onDirectorySelect}
			onOptionSelect={onDirectoryOptionsSelect}
			directories={props.directories}/>}
		<FilesContainer onSelect={onFileSelect} files={props.files}/>
		<div className={styles.add} onClick={() => setCreator("file")}>
			<AddIcon className={styles.addButton}/>
		</div>
		<div className={styles.folder} onClick={() => setCreator("dir")}>
			<CreateNewFolderIcon className={styles.folderButton}/>
		</div>
		{creator && <CreateModal
			onCancel={() => setCreator(undefined)}
			onCreate={value => {
				window.open(`/api/${creator === "dir" ? "directory" : "file"}/create?parent=${props.id}&name=${value}`, "_self");
			}}
			mode={creator}/>}
	</div>);

};
