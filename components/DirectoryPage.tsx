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
import {ModalEditor} from "./ModalEditor";
import {IDirectory, IFile} from "./local-types";
import {Modal} from "./Modal";

export interface DirectoryPageProps {
	id: string;
	directories: IDirectory[];
	files: IFile[];
}

export const DirectoryPage: FC<DirectoryPageProps> = props => {

	const [creator, setCreator] = useState<"dir" | "file" | undefined>(undefined);
	const [deleteItem, setDeleteItem] = useState<IFile | IDirectory | undefined>(undefined);
	const [editItem, setEditItem] = useState<IFile | IDirectory | undefined>(undefined);

	return (<div className={styles.container}>
		{(props.directories.length + props.files.length === 0) && <div className={styles.nofile}>
			<span>Click + below to create a file or directory.</span>
		</div>}
		{props.directories.length > 0 && <DirectoryContainer
			onSelect={d => window.open(`/view/${d.id}`, "_self")}
			onEdit={d => setEditItem(d)}
			onDelete={d => setDeleteItem(d)}
			directories={props.directories}/>}
		<FilesContainer onEdit={f => setEditItem(f)} onDelete={f => setDeleteItem(f)} onSelect={f => window.open(`/edit/${f.id}`, "_self")} files={props.files}/>
		<div className={styles.add} onClick={() => setCreator("file")}>
			<AddIcon className={styles.addButton}/>
		</div>
		<div className={styles.folder} onClick={() => setCreator("dir")}>
			<CreateNewFolderIcon className={styles.folderButton}/>
		</div>
		{creator && <ModalEditor
			onCancel={() => setCreator(undefined)}
			onCreate={value => {
				window.open(`/api/${creator === "dir" ? "directory" : "file"}/create?parent=${props.id}&name=${value}`, "_self");
			}}
			title={"Create New " + (creator === "dir" ? "Directory" : "File")}/>}
		{deleteItem && <Modal title={"Delete " + deleteItem.name} submitText={"Delete"} onCancel={() => setDeleteItem(undefined)} onSubmit={() => {
			if (Object.keys(deleteItem).includes("content")) window.open("/api/file/delete?id=" + deleteItem?.id, "_self");
			else window.open("/api/directory/delete?id=" + deleteItem?.id, "_self");
		}}/>}
		{editItem && <ModalEditor
			defaultValue={editItem.name}
			onCancel={() => setEditItem(undefined)}
			submitText={"Save"}
			onCreate={value => {
				if (Object.keys(editItem).includes("content")) window.open("/api/file/edit?id=" + editItem.id + "&name=" + value, "_self");
				else window.open("/api/directory/update?id=" + editItem.id + "&name=" + value, "_self");
			}}
			title={"Edit Name"}/>}
	</div>);

};
