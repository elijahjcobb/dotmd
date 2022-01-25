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
import {useDrag, useDrop} from "react-dnd";
import {DropResult} from "./File";

export interface DirectoryProps {
	directory: IDirectory;
	onSelect: (dir: IDirectory) => void;
	onEdit: (dir: IDirectory) => void;
	onDelete: (dir: IDirectory) => void;
}

export const Directory: FC<DirectoryProps> = props => {

	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		// The type (or types) to accept - strings or symbols
		accept: 'BOX',
		// Props to collect,
		drop: () => ({ id: props.directory.id }),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop()
		})
	}))

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
				const src = props.directory.id;
				const dest = dropResult.id;
				if (src === dest) return;
				if (props.directory.parent === dest) return;
				window.open("/api/directory/move?src=" + src + "&dest=" + dest, "_self");
			}
		},
	}))


	return (<div ref={drag}>
		<div ref={drop} onClick={() => props.onSelect(props.directory)} className={styles.container + " " + (isOver ? styles.over : "")}>
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
		</div>
	</div>);

};
