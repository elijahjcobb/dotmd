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