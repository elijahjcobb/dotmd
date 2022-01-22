/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC} from "react";
import styles from "../styles/DirectoryContainer.module.scss";
import {Directory} from "./Directory";
import {IDirectory} from "./types";

export interface DirectoryContainerProps {
	directories: IDirectory[];
	onSelect: (dir: IDirectory) => void;
	onOptionSelect: (dir: IDirectory) => void;
}

export const DirectoryContainer: FC<DirectoryContainerProps> = props => {

	return (<div className={styles.container}>
		{props.directories.map((v, i) => {
			return <Directory
				key={i}
				onSelect={props.onSelect}
				onOptionSelect={props.onOptionSelect}
				directory={v}/>
		})}
	</div>);

};
