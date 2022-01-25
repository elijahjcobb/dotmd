/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC} from "react";
import {File} from "./File";
import {IFile} from "./local-types";

export interface FilesContainerProps {
	files: IFile[];
	onSelect: (file: IFile) => void;
	onEdit: (file: IFile) => void;
	onDelete: (file: IFile) => void;
}

export const FilesContainer: FC<FilesContainerProps> = props => {

	return (<div>
		{props.files.map((v, i) => {
			return <File onEdit={() => props.onEdit(v)} onDelete={() => props.onDelete(v)} onSelect={() => props.onSelect(v)} file={v} key={i}/>
		})}
	</div>);

};
