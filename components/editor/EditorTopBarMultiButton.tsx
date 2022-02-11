/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC} from "react";
import styles from "../../styles/EditorTopBarMultiButton.module.scss";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export interface EditorTopBarMultiButtonProps {
	onPrimaryClick: () => void;
	onSecondaryClick: () => void;
}

export const EditorTopBarMultiButton: FC<EditorTopBarMultiButtonProps> = props => {

	return (<div className={styles.container} onClick={props.onPrimaryClick}>
		<div className={styles.primary}>
			{props.children}
		</div>
		<div className={styles.secondary} onClick={e => {
			e.stopPropagation();
			props.onSecondaryClick();
		}}>
			<MoreHorizIcon/>
		</div>
	</div>);

};
