/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {SiDatabase, SiID, SiObject, SiObjectProps} from "@element-ts/silicon";

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
	parent: SiID;
	owner: SiID;
}

export class Directory extends SiObject<DirectoryProps> {

	public constructor(value: DirectoryProps) {
		super("directories", value);
	}

}

export interface FileProps extends SiObjectProps {
	name: string
	parent: SiID;
	owner: SiID;
	content: string;
	public: boolean;
}

export class File extends SiObject<FileProps> {

	public constructor(value: FileProps) {
		super("files", value);
	}

}

export interface AttachmentProps extends SiObjectProps {
	owner: SiID;
	parent: SiID;
	content: Buffer;
	mime: string;
}

export class Attachment extends SiObject<AttachmentProps> {

	public constructor(value: AttachmentProps) {
		super("attachments", value);
	}

}

export interface SketchProps extends SiObjectProps {
	owner: SiID;
	parent: SiID;
	svg: Buffer;
	paths: Buffer;
}

export class Sketch extends SiObject<SketchProps> {
	public constructor(value: SketchProps) {
		super("sketches", value);
	}
}

export interface AnalyticsProps extends SiObjectProps {
	user: SiID;
	targetType: "dir" | "file" | "page";
	actionType: "create" | "delete" | "move" | "update" | "view";
	targetId: SiID;
}

export class Analytics extends SiObject<AnalyticsProps> {

	public constructor(value: AnalyticsProps) {
		super("analytics", value);
	}

}

export interface SignUpInviteProps extends SiObjectProps {
	email: string;
	used: boolean;
}

export class SignUpInvite extends SiObject<SignUpInviteProps> {

	public constructor(value: SignUpInviteProps) {
		super("signupinvite", value);
	}


}