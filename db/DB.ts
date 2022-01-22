/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {MongoClient, Db, Collection} from "mongodb";

let db: Db;

async function getCollection(collection: string): Promise<Collection<Document>> {

	if (!db) {
		let client = new MongoClient("mongodb://localhost:27017");
		await client.connect();
		db = client.db("dotmd");
	}

	return db.collection(collection);

}

export function getCollectionUser() {
	return getCollection("users");
}

export function getCollectionFiles() {
	return getCollection("files");
}

export function getCollectionDirectories() {
	return getCollection("directories");
}