/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC} from "react";
import {
	CloudDone,
	CloudQueue,
	Error,
	Folder,
	AddPhotoAlternate,
	Edit
} from "@mui/icons-material";
import styles from "../../styles/EditorTopBar.module.scss";
import {SaveStatus} from "../../pages/edit/[id]";
import {useSession} from "next-auth/react";
import {EditorMode, EditorModePicker} from "./EditorModePicker";
import {EditorDarkModePicker} from "./EditorDarkModePicker";
import {EditorThemePicker} from "./EditorThemePicker";
import {EditorAttachmentManager} from "./EditorAttachmentManager";
import {EditorAccess, EditorAccessPicker} from "./EditorAccessPicker";
import HelpIcon from '@mui/icons-material/Help';
import buttonStyles from "../../styles/EditorAttachmentManager.module.scss";

export interface EditorTopBarProps {
	openFolder: () => void;
	newImage: () => void;
	newSketch: () => void;
	openImages: () => void;
	openSketches: () => void;
	saveStatus: SaveStatus;
	saveMessage: string;
	mode: EditorMode;
	setMode: (value: EditorMode) => void;
	darkMode: boolean;
	setDarkMode: (value:  boolean) => void;
	academicTheme: boolean;
	setAcademicTheme: (value: boolean) => void;
	title: string;
	setTitle: (value: string) => void;
	updateDoc: () => void;
	access: EditorAccess;
	setAccess: (access: EditorAccess) => void;
}

export const EditorTopBar: FC<EditorTopBarProps> = props => {

	const session = useSession();
	const user: string = session.data?.user?.image ?? "";

	return (<div className={styles.topBar}>
		<div className={styles.left}>
			<img onClick={props.openFolder} className={styles.logo} src={"/dotmd.png"} alt={"icon"}/>
			{/*<Folder onClick={props.openFolder} className={styles.folder}/>*/}
			{/*<span className={styles.sep}>/</span>*/}
			<input onBlur={props.updateDoc} onChange={e => props.setTitle(e.target.value)} className={styles.name} value={props.title} />
		</div>
		<div className={styles.right}>
			{props.saveStatus === SaveStatus.Saved && <CloudDone className={styles.saved + " " + styles.saveIcon}/>}
			{props.saveStatus === SaveStatus.Unsaved && <CloudQueue className={styles.unsaved + " " + styles.saveIcon}/>}
			{props.saveStatus === SaveStatus.Error && <Error className={styles.saveError + " " + styles.saveIcon}/>}
			{/*<span className={styles.saveMessage}>{props.saveMessage + "..."}</span>*/}
			<EditorAttachmentManager onClick={props.newImage} onSecondaryClick={props.openImages}>
				<AddPhotoAlternate/>
			</EditorAttachmentManager>
			<EditorAttachmentManager onClick={props.newSketch} onSecondaryClick={props.openSketches}>
				<Edit/>
			</EditorAttachmentManager>
			<EditorModePicker value={props.mode} setValue={props.setMode}/>
			<EditorDarkModePicker value={props.darkMode} setValue={props.setDarkMode}/>
			<EditorThemePicker value={props.academicTheme} setValue={props.setAcademicTheme}/>
			<EditorAccessPicker value={props.access} setValue={props.setAccess}/>
			<div onClick={() => {
				window.open("https://dotmd.app/preview/6201db268c37cb52f7a1f923", "_blank")
			}} className={buttonStyles.left + " " + buttonStyles.container}>
				<HelpIcon/>
			</div>
			<img className={styles.profilePic} src={user} alt={"profile"}/>
		</div>
	</div>);

};
