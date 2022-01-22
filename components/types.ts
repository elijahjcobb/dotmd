/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

interface IItem {
	id: string;
	name: string;
}

export interface IFile extends IItem {
	updatedAt: number;
}

export interface IDirectory extends IItem {

}