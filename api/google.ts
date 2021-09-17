/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {google} from "googleapis";
import {OAuth2Client} from "google-auth-library";

export function createClient(): OAuth2Client {
	return new google.auth.OAuth2(
		"417774683388-6u56obkasqgqdq8d63k735af7cc27gl3.apps.googleusercontent.com",
		process.env.GOOGLE_SECRET,
		"http://localhost:3000/api/auth/callback"
	)
}

export function getAuthFromCookie(cookie: object): OAuth2Client {
	const client = createClient();

	client.setCredentials({
		//@ts-ignore
		refresh_token: cookie["refresh_token"],
		//@ts-ignore
		expiry_date: parseInt(cookie["expiry_date"]),
		//@ts-ignore
		access_token: cookie["access_token"],
		//@ts-ignore
		token_type: cookie["token_type"],
		//@ts-ignore
		id_token: cookie["id_token"],
		//@ts-ignore
		scope: cookie["scope"],
	})

	return client;
}

export function createAuthURL(client: OAuth2Client): string {
	return client.generateAuthUrl({
		access_type: "offline",
		prompt: "consent",
		scope: ["email", "profile", "https://www.googleapis.com/auth/drive.file", "https://www.googleapis.com/auth/drive.install"]
	});
}