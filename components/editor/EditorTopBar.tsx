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
	Image,
} from "@mui/icons-material";
import styles from "../../styles/EditorTopBar.module.scss";
import {SaveStatus} from "../../pages/edit/[id]";
import {useSession} from "next-auth/react";
import {EditorMode, EditorModePicker} from "./EditorModePicker";
import {EditorDarkModePicker} from "./EditorDarkModePicker";
import {EditorThemePicker} from "./EditorThemePicker";

export interface EditorTopBarProps {
	openFolder: () => void;
	openFile: () => void;
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

}

export const EditorTopBar: FC<EditorTopBarProps> = props => {

	const session = useSession();
	const user: string = session.data?.user?.image ?? "";

	return (<div className={styles.topBar}>
		<div className={styles.left}>
			<img onClick={props.openFolder} className={styles.logo} src={"/dotmd.png"} alt={"icon"}/>
			<Folder onClick={props.openFolder} className={styles.folder}/>
			<span className={styles.sep}>/</span>
			<input onBlur={props.updateDoc} onChange={e => props.setTitle(e.target.value)} className={styles.name} value={props.title} />
		</div>
		<div className={styles.right}>
			{props.saveStatus === SaveStatus.Saved && <CloudDone className={styles.saved + " " + styles.saveIcon}/>}
			{props.saveStatus === SaveStatus.Unsaved && <CloudQueue className={styles.unsaved + " " + styles.saveIcon}/>}
			{props.saveStatus === SaveStatus.Error && <Error className={styles.saveError + " " + styles.saveIcon}/>}
			<span className={styles.saveMessage}>{props.saveMessage + "..."}</span>
			<div className={styles.uploadImage} onClick={props.openFile}><Image/></div>
			<EditorModePicker value={props.mode} setValue={props.setMode}/>
			<EditorDarkModePicker value={props.darkMode} setValue={props.setDarkMode}/>
			<EditorThemePicker value={props.academicTheme} setValue={props.setAcademicTheme}/>
			<img className={styles.profilePic} src={user} alt={"profile"}/>
		</div>
	</div>);

};
