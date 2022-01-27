/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {SiDatabase, SiObject, SiObjectProps} from "@element-ts/silicon";

SiDatabase.init({
	address: "mongodb://localhost:27017",
	database: "dotmd"
}).catch(console.error);

export interface UserProps extends SiObjectProps {
	email: string;
}

export class User extends SiObject<UserProps> {

	public constructor(value: UserProps) {
		super("users", value);
	}

}

export interface DirectoryProps extends SiObjectProps {
	name: string;
	parent: string;
	owner: string;
}

export class Directory extends SiObject<DirectoryProps> {

	public constructor(value: DirectoryProps) {
		super("directories", value);
	}

}

export interface FileProps extends SiObjectProps {
	name: string
	parent: string;
	owner: string;
	content: string;
}

export class File extends SiObject<FileProps> {

	public constructor(value: FileProps) {
		super("files", value);
	}

}

export interface AttachmentProps extends SiObjectProps {
	owner: string;
	parent: string;
	content: Buffer;
	mime: string;
}

export class Attachment extends SiObject<AttachmentProps> {

	public constructor(value: AttachmentProps) {
		super("attachments", value);
	}

}

export interface AnalyticsProps extends SiObjectProps {
	user: string;
	targetType: "dir" | "file";
	actionType: "create" | "delete" | "move" | "update" | "view";
	targetId: string;
}

export class Analytics extends SiObject<AnalyticsProps> {

	public constructor(value: AnalyticsProps) {
		super("analytics", value);
	}

}