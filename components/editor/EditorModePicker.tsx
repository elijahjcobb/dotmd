/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC} from "react";
import ToggleButton from "@mui/material/ToggleButton";
import styles from "../../styles/EditorTopBar.module.scss";
import {ChromeReaderMode, Code, Description} from "@mui/icons-material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export enum EditorMode {
	SOURCE,
	SPLIT,
	PREVIEW
}

export interface EditorModePickerProps {
	value: EditorMode;
	setValue: (value: EditorMode) => void;
}

export const EditorModePicker: FC<EditorModePickerProps> = props => {

	return (<ToggleButtonGroup
		className={styles.picker + " " + styles.modePicker}
		value={props.value}
		exclusive
		onChange={(
			event: React.MouseEvent<HTMLElement>,
			newValue: EditorMode
		) => {
			props.setValue(newValue);
		}}
	>
		<ToggleButton value={EditorMode.SOURCE}>
			<Code />
		</ToggleButton>
		<ToggleButton value={EditorMode.SPLIT}>
			<ChromeReaderMode />
		</ToggleButton>
		<ToggleButton value={EditorMode.PREVIEW}>
			<Description />
		</ToggleButton>
	</ToggleButtonGroup>);

};
