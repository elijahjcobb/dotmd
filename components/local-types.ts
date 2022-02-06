import {SiID} from "@element-ts/silicon";

/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

interface Base {
	id: string;
	updatedAt: number;
	createdAt: number;
}

export interface IUser extends Base {
	email: string;
}

export interface IInvite extends Base {
	email: string;
	used: boolean;
}


export interface IDirectory extends Base {
	name: string;
	parent: string;
	owner: string;
}


export interface IFile extends Base {
	name: string
	parent: string;
	owner: string;
	content: string;
}

export interface IAttachment extends Base {
	parent: string;
	owner: string;
	content: string;
	mime: string;
}

export interface ISketch extends Base {
	parent: string;
	owner: string;
	svg: string;
	paths: string;
}

//
// async function directoryDelete(dir: IDirectory): Promise<void> {
//
// }
//
// async function directoryCreate(name: string, parent: string): Promise<IDirectory> {
// 	return {
// 		name: "dir",
// 		owner: "a",
// 		id: "A",
// 		parent: "a",
// 		updatedAt: Date.now(),
// 		createdAt: Date.now()
// 	}
// }
//
// async function directoryRename(dir: IDirectory): Promise<void> {
//
// }
//
// async function fileDelete(dir: IFile): Promise<void> {
//
// }
//
// async function fileCreate(name: string, parent: string): Promise<IFile> {
// 	return {
// 		name: "dir",
// 		owner: "a",
// 		id: "A",
// 		content: "# ",
// 		parent: "a",
// 		updatedAt: Date.now(),
// 		createdAt: Date.now()
// 	}
// }
//
// async function fileRename(file: IFile): Promise<void> {
//
// }
//
// async function directoryGetChildren(dir: IDirectory): Promise<{dirs: {dir: IDirectory, children: {dirs: IDirectory[], files: IFile[]}}[], files: IFile[]}> {
// 	return {
// 		dirs: [],
// 		files: []
// 	}
// }
