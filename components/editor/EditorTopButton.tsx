/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC} from "react";
import styles from "../../styles/EditorTopButton.module.scss";

export interface EditorTopButtonProps {
	onClick: () => void;
	className?: string
}

export const EditorTopButton: FC<EditorTopButtonProps> = props => {

	return (<div onClick={props.onClick} className={styles.container + (props.className ? (" " + props.className) : "")}>
		{props.children}
	</div>);

};
