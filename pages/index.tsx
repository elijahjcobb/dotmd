import type {GetServerSideProps, NextPage} from 'next'
import {App, AppProps} from "../components/App";
import {getAuthFromCookie} from "../api/google";
import {google} from "googleapis";


const Home: NextPage<AppProps> = (props) => {
	return <App {...props}/>
}

function handleError(msg?: string) {
	return {redirect: {destination: "/error" + (msg ? ("?msg=" + encodeURIComponent(msg)) : "")}}
}

//@ts-ignore
export const getServerSideProps: GetServerSideProps<AppProps> = async (context) => {

	const expireCookie = context.req.cookies?.["expiry_date"] as string | undefined;
	if (!expireCookie) return {redirect: {destination: "/api/auth"}}

	const auth = getAuthFromCookie(context.req.cookies);
	const drive = google.drive({version: "v3", auth});
	const fileId = context.req.cookies.file

	if (!fileId) return {redirect: {destination: "https://drive.google.com"}}

	//drive.files.get({ fileId: fileId, alt: 'media', fields: "*" }).then(result => { console.log(result); }).catch(err=>{ console.log(err); })
	let fileInfo;
	try {
		fileInfo = await drive.files.get({fileId, fields: "*"})
	} catch (e) {
		const err = e as Error;
		console.error(err);
		if (err.message === "Invalid Credentials") return {redirect: {destination: "/api/auth"}}
		if (err.message.indexOf("File not found") !== -1) return {redirect: {destination: "https://drive.google.com"}}
		return handleError("Could not access file info.");
	}
	
	if (fileInfo.data.trashed) return {redirect: {destination: "https://drive.google.com"}}
	//@ts-ignore
	const name = fileInfo.data.owners[0].displayName as string;
	//@ts-ignore
	const profile = fileInfo.data.owners[0].photoLink as string;
	const fileName = (fileInfo.data.name as string).replace(".md", "");

	let fileData;
	try {
		fileData = await drive.files.get({fileId, alt: "media"})
	} catch (e) {
		const err = e as Error;
		console.error(err);
		if (err.message === "Invalid Credentials") return {redirect: {destination: "/api/auth"}}
		return handleError("Could not access file data.");
	}
	return { props: {
		name, fileName, profile, data: fileData.data as string
	}};
}

// import type { NextApiRequest, NextApiResponse } from "next";
// import {getAuthFromCookie} from "../../api/google";
// import {google} from "googleapis";
//
// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
// 	const auth = getAuthFromCookie(req.cookies);
// 	const drive = google.drive({version: "v3", auth});
// 	const fileId = req.cookies.file
//
// 	drive.files.get({ fileId: fileId, alt: 'media', fields: "*" }).then(result => { console.log(result); }).catch(err=>{ console.log(err); })
//
// 	const fileInfo = await drive.files.get({fileId, fields: "*"})
// 	//@ts-ignore
// 	const name = fileInfo.data.owners[0].displayName as string;
// 	//@ts-ignore
// 	const profile = fileInfo.data.owners[0].photoLink as string;
// 	const fileName = (fileInfo.data.name as string).replace(".md", "");
//
// 	const fileData = await drive.files.get({fileId, alt: "media"})
//
// 	res.send({name, profile, fileName, data: fileData.data});
// }


export default Home
