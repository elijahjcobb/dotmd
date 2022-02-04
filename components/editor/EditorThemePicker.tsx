/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC} from "react";
import ToggleButton from "@mui/material/ToggleButton";
import {School, Work} from "@mui/icons-material";
import styles from "../../styles/EditorTopBar.module.scss";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export interface EditorThemePickerProps {
	value: boolean;
	setValue: (value: boolean) => void;
}

export const EditorThemePicker: FC<EditorThemePickerProps> = props => {

	return (<ToggleButtonGroup
		className={styles.picker + " " + styles.themePicker}
		value={props.value ? "a" : "w"}
		exclusive
		onChange={(
			event: React.MouseEvent<HTMLElement>,
			newValue: "w" | "a"
		) => {
			props.setValue(newValue === "a");
		}}
	>
		<ToggleButton value={"w"}>
			<Work />
		</ToggleButton>
		<ToggleButton value={"a"}>
			<School />
		</ToggleButton>
	</ToggleButtonGroup>);

};
