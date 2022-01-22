/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC} from "react";
import {File} from "./File";
import {IFile} from "./types";

export interface FilesContainerProps {
	files: IFile[];
	onSelect: (file: IFile) => void;
}

export const FilesContainer: FC<FilesContainerProps> = props => {

	return (<div>
		{props.files.map((v, i) => {
			return <File onClick={() => props.onSelect(v)} file={v} key={i}/>
		})}
	</div>);

};
