/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC} from "react";
import ToggleButton from "@mui/material/ToggleButton";
import {NightsStay, WbSunny} from "@mui/icons-material";
import styles from "../../styles/EditorTopBar.module.scss";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export interface EditorDarkModePickerProps {
	value: boolean;
	setValue: (value: boolean) => void;
}

export const EditorDarkModePicker: FC<EditorDarkModePickerProps> = props => {

	return (<ToggleButtonGroup
		className={styles.picker + " " + styles.darkPicker}
		value={props.value ? "n" : "d"}
		exclusive
		onChange={(
			event: React.MouseEvent<HTMLElement>,
			newValue: "d" | "n"
		) => {
			props.setValue(newValue === "n");
		}}
	>
		<ToggleButton value={"d"}>
			<WbSunny />
		</ToggleButton>
		<ToggleButton value={"n"}>
			<NightsStay />
		</ToggleButton>
	</ToggleButtonGroup>);

};
