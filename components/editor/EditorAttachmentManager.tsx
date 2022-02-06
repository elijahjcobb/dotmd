/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC} from "react";
import styles from "../../styles/EditorAttachmentManager.module.scss";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export interface EditorAttachmentManagerProps {
	onClick: () => void;
	onSecondaryClick: () => void;
}

export const EditorAttachmentManager: FC<EditorAttachmentManagerProps> = props => {

	return (<div className={styles.container}>
		<div className={styles.left} onClick={props.onClick}>
			{props.children}
		</div>
		<div className={styles.right} onClick={props.onSecondaryClick}>
			<MoreVertIcon/>
		</div>
	</div>);

};
