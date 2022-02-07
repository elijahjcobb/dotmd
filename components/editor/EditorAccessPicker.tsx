/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC} from "react";
import ToggleButton from "@mui/material/ToggleButton";
import styles from "../../styles/EditorTopBar.module.scss";
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export enum EditorAccess {
	PRIVATE,
	PUBLIC
}

export interface EditorAccessPickerProps {
	value: EditorAccess;
	setValue: (value: EditorAccess) => void;
}

export const EditorAccessPicker: FC<EditorAccessPickerProps> = props => {

	return (<ToggleButtonGroup
		className={styles.picker + " " + styles.modePicker}
		value={props.value}
		exclusive
		onChange={(
			event: React.MouseEvent<HTMLElement>,
			newValue: EditorAccess
		) => {
			props.setValue(newValue);
		}}
	>
		<ToggleButton value={EditorAccess.PRIVATE}>
			<LockIcon />
		</ToggleButton>
		<ToggleButton value={EditorAccess.PUBLIC}>
			<PublicIcon />
		</ToggleButton>
	</ToggleButtonGroup>);

};
