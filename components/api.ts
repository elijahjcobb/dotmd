/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 */

import Parse from "parse";

Parse.serverURL = "https://api.elijahcobb.com/dotmd"
Parse.initialize("dotmd");

export interface UserProps {

}

export interface DirectoryProps {
	name: string;
	dir?: Directory;
	owner: User;
}

export interface FileProps {
	name: string;
	content: string;
	dir?: Directory;
	owner: User;
}

export interface ImageProps {
	file: Parse.File;
	owner: User;
}

export class User extends Parse.User<UserProps> {

	public constructor(props: UserProps) {
		super(props);
	}

	public generateACL(): Parse.ACL {
		const acl = new Parse.ACL(this);
		acl.setPublicReadAccess(false);
		acl.setPublicWriteAccess(false);
		return acl;
	}

	public static async register(username: string, password: string, props: UserProps, options?: Parse.SignUpOptions): Promise<User> {
		const u = await User.signUp(username, password, props, options);
		const acl = new Parse.ACL(u);
		acl.setPublicReadAccess(false);
		u.setACL(acl);
		await u.save();
		// @ts-ignore
		return u;
	}

}

export class Directory extends Parse.Object<DirectoryProps> {

	public constructor(props: DirectoryProps) {
		super("Directory", props);
		this.setACL(props.owner.generateACL());
	}

}

export class File extends Parse.Object<FileProps> {

	public constructor(props: FileProps) {
		super("File", props);
		this.setACL(props.owner.generateACL());
	}

}

export class Image extends Parse.Object<ImageProps> {

	public constructor(props: ImageProps) {
		super("Image", props);
		this.setACL(props.owner.generateACL());
	}

}