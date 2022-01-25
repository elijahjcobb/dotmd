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

export interface FileProps {
	file: IFile;
	onClick?: () => void;
}

export const File: FC<FileProps> = props => {

	const d = new Date(props.file.updatedAt);
	const date = d.toLocaleDateString();
	const time = d.toLocaleTimeString();
	const lastUpdated = date + " " + time;

	return (<div onClick={props.onClick} className={styles.container}>
		<ArticleIcon/>
		<span className={styles.name}>{props.file.name}</span>
		<span className={styles.date}>{lastUpdated}</span>
	</div>);

};
