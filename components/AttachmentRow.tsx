/*
 * Elijah Cobb
 * github.com/elijahjcobb
 * ejcobb@mtu.edu
 */

import {FC} from "react";
import styles from "../styles/AttachmentRow.module.scss";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';

export interface SketchRowProps {

}

export const AttachmentRow: FC<SketchRowProps> = props => {

	return (<div className={styles.container}>
		<img className={styles.preview} alt={"sketch"} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Domestic_llama_%282009-05-19%29.jpg/440px-Domestic_llama_%282009-05-19%29.jpg"}/>
		<div className={styles.options}>
			<ContentCopyIcon className={styles.copy}/>
			<DeleteIcon className={styles.delete}/>
		</div>
	</div>);

};