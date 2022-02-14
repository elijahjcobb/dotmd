/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC} from "react";
import {
	ChromeReaderMode,
	CloudDone,
	CloudQueue,
	Code,
	Description,
	Error,
	NightsStay,
	School,
	WbSunny,
	Work
} from "@mui/icons-material";
import styles from "../../styles/EditorTopBar.module.scss";
import {Access, SaveStatus, Style, Theme} from "../../pages/edit/[id]";
import {useSession} from "next-auth/react";
import {EditorMode} from "./EditorModePicker";
import HelpIcon from '@mui/icons-material/Help';
import {EditTopBarSelector} from "./EditTopBarSelector";
import SketchIcon from '@mui/icons-material/Edit';
import PhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import {EditorTopBarMultiButton} from "./EditorTopBarMultiButton";
import {EditorTopButton} from "./EditorTopButton";
import {IFile} from "../local-types";
import PreviewIcon from "@mui/icons-material/Preview";

export interface EditorTopBarProps {
	openFolder: () => void;
	file: IFile;
	newImage: () => void;
	newSketch: () => void;
	openImages: () => void;
	openSketches: () => void;
	saveStatus: SaveStatus;
	mode: EditorMode;
	setMode: (value: EditorMode) => void;
	theme: Theme;
	setTheme: (value:  Theme) => void;
	style: Style;
	setStyle: (value: Style) => void;
	title: string;
	setTitle: (value: string) => void;
	updateDoc: () => void;
	access: Access;
	setAccess: (access: Access) => void;
}

export const EditorTopBar: FC<EditorTopBarProps> = props => {

	const session = useSession();
	const user: string = session.data?.user?.image ?? "";

	return (<div className={styles.topBar + (props.theme === Theme.DARK ? (" " + styles.dark) : "")}>
		<div className={styles.top}>
			<img onClick={props.openFolder} className={styles.logo} src={"/dotmd.png"} alt={"icon"}/>
		</div>
		<div className={styles.middle}>
			<EditorTopBarMultiButton onPrimaryClick={props.newImage} onSecondaryClick={props.openImages}>
				<PhotoIcon/>
			</EditorTopBarMultiButton>
			<EditorTopBarMultiButton onPrimaryClick={props.newSketch} onSecondaryClick={props.openSketches}>
				<SketchIcon/>
			</EditorTopBarMultiButton>
			<EditTopBarSelector value={props.mode} onChange={props.setMode}>
				<Code/>
				<ChromeReaderMode/>
				<Description/>
			</EditTopBarSelector>
			<EditTopBarSelector value={props.theme} onChange={props.setTheme}>
				<WbSunny/>
				<NightsStay/>
			</EditTopBarSelector>
			<EditTopBarSelector value={props.style} onChange={props.setStyle}>
				<Work/>
				<School/>
			</EditTopBarSelector>
			<EditTopBarSelector value={props.access} onChange={props.setAccess}>
				<LockIcon/>
				<PublicIcon/>
			</EditTopBarSelector>
			{props.access === Access.PUBLIC && <EditorTopButton onClick={() => window.open("/preview/" + props.file.id, "_blank")}>
				<PreviewIcon/>
			</EditorTopButton>}
			<EditorTopButton onClick={() => window.open("https://dotmd.app/preview/6201db268c37cb52f7a1f923", "_blank")}>
				<HelpIcon/>
			</EditorTopButton>
		</div>
		<div className={styles.bottom}>
			{props.saveStatus === SaveStatus.Saved && <CloudDone className={styles.saved + " " + styles.saveIcon}/>}
			{props.saveStatus === SaveStatus.Unsaved && <CloudQueue className={styles.unsaved + " " + styles.saveIcon}/>}
			{props.saveStatus === SaveStatus.Error && <Error className={styles.saveError + " " + styles.saveIcon}/>}
			<img className={styles.profilePic} src={user} alt={"profile"}/>
		</div>
	</div>);

};
