/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import {createClient} from "../../../api/google";
import {serialize} from "cookie";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const code = req.query.code as string | undefined;
	if (code) {
		const client = createClient();
		const token = await client.getToken(code);
		res.setHeader('Set-Cookie', [
			serialize('id_token', token.tokens.id_token ?? "", { path: '/' }),
			serialize('access_token', token.tokens.access_token ?? "", { path: '/' }),
			serialize('token_type', token.tokens.token_type ?? "", { path: '/' }),
			serialize('refresh_token', token.tokens.refresh_token ?? "", { path: '/' }),
			serialize('scope', token.tokens.scope ?? "", { path: '/' }),
			serialize('expiry_date', (token.tokens.expiry_date ?? 0) + "", { path: '/' }),
		]);
		res.redirect("/");

		// let oauth2 = google.oauth2({version: 'v2', auth: oauth2Client});
		// let userInfo = await oauth2.userinfo.v2.me.get();
		//
		// console.log(userInfo);



		// const drive = google.drive({version: "v3", auth: client});
		//
		// var fileMetadata = {
		// 	'name': 'test.md',
		// 	'parents': ["1rO2wKHKwazNW0WZGoSNY9xVrp5cFXCQz"]
		// };
		// var media = {
		// 	mimeType: 'text/markdown',
		// 	body: "hello world"
		// };
		//
		// const file = await drive.files.create({
		// 	// @ts-ignore
		// 	resource: fileMetadata,
		// 	media: media,
		// 	fields: 'id'
		// });
		//
		// console.log(file);
		//
		// res.send(file);
	} else {
		res.redirect("/");
	}
}

// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
// 	const code = req.query.code as string | undefined;
// 	if (code) {
// 		const tokens = (await oauth2Client.getToken(code)).tokens;
//
// 		oauth2Client.setCredentials(tokens);
// 		let oauth2 = google.oauth2({version: 'v2', auth: oauth2Client});
// 		let userInfo = await oauth2.userinfo.v2.me.get();
//
// 		console.log(userInfo);
//
// 		const drive = google.drive({version: "v3", auth: oauth2Client});
//
// 		var fileMetadata = {
// 			'name': 'test.md',
// 			'parents': ["1rO2wKHKwazNW0WZGoSNY9xVrp5cFXCQz"]
// 		};
// 		var media = {
// 			mimeType: 'text/markdown',
// 			body: "hello world"
// 		};
//
// 		const file = await drive.files.create({
// 			// @ts-ignore
// 			resource: fileMetadata,
// 			media: media,
// 			fields: 'id'
// 		});
//
// 		console.log(file);
//
// 		res.send(userInfo);
// 	} else {
// 		res.redirect("/");
// 	}
// }

