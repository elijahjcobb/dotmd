import type {GetServerSideProps, NextPage} from 'next'
import {App, AppProps} from "../components/App";
import {getAuthFromCookie} from "../api/google";
import {google} from "googleapis";


const Home: NextPage<AppProps> = (props) => {
	return <App {...props}/>
}

function handleError(msg?: string) {
	return {redirect: {permanent: false, destination: "/error" + (msg ? ("?msg=" + encodeURIComponent(msg)) : "")}}
}

//@ts-ignore
export const getServerSideProps: GetServerSideProps<AppProps> = async (context) => {

// 	return {props: {name: "Elijah Cobb", fileName: "My File", data: `# header 1
// Lorem markdownum cernes pedum quod, *fuit merum* rapta litore sub Stygiis, et.
// Esse sanguine, oritur enim lucoque vitat, cruor **causam hoc**. Ecce quid piget
// saucius munere liquidumque nepotis altis fregit vincis certaminis atlas.
// ## header 2
// Lorem markdownum cernes pedum quod, *fuit merum* rapta litore sub Stygiis, et.
// Esse sanguine, oritur enim lucoque vitat, cruor **causam hoc**. Ecce quid piget
// saucius munere liquidumque nepotis altis fregit vincis certaminis atlas.
// ### header 3
// Lorem markdownum cernes pedum quod, *fuit merum* rapta litore sub Stygiis, et.
// Esse sanguine, oritur enim lucoque vitat, cruor **causam hoc**. Ecce quid piget
// saucius munere liquidumque nepotis altis fregit vincis certaminis atlas.
// #### header 4
// Lorem markdownum cernes pedum quod, *fuit merum* rapta litore sub Stygiis, et.
// Esse sanguine, oritur enim lucoque vitat, cruor **causam hoc**. Ecce quid piget
// saucius munere liquidumque nepotis altis fregit vincis certaminis atlas.
// ##### header 5
// Lorem markdownum cernes pedum quod, *fuit merum* rapta litore sub Stygiis, et.
// Esse sanguine, oritur enim lucoque vitat, cruor **causam hoc**. Ecce quid piget
// saucius munere liquidumque nepotis altis fregit vincis certaminis atlas.
//
// # heeader 1
// ## jeader 22
// ### header 3
// #### header 4
//
// > Unam Vulcania. Visa virisque. Sed frena Et non adest. Sine **iuvenes**, unda?
//
// Here is a [link](https://google.com). It will open gogle.
//
// Here is some text with \`code inside of it\` but here is some with $LaTeX$ inside of it.
//
// \`\`\`c
// int c = 0;
// int* a = &c;
// *a = *a + 1;
// \`\`\`
//
// $$
// f(x)=2^{x^3}+\\dfrac{1}{x^2}
// $$
//
// And here is more text, cool.
//
// Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget nibh sit amet justo volutpat pretium in a mauris. Vivamus efficitur at sapien eu molestie. Donec egestas sem ac diam iaculis condimentum. Vestibulum malesuada metus eu bibendum tempus. Quisque at pretium nisi, in vulputate turpis. In hac habitasse platea dictumst. Duis id lectus eget mi tincidunt posuere ac vitae nulla. Morbi suscipit mi vitae dui auctor, in sagittis nibh dapibus. Nullam sed blandit neque, at commodo massa. Nunc non purus lacus. Nam augue ipsum, bibendum id enim in, porttitor sollicitudin quam. Etiam tempor, lectus tristique dapibus tempus, ligula quam euismod enim, nec hendrerit lectus diam ac nisl. Nulla eu nibh faucibus, mollis nulla vel, bibendum nulla. Curabitur consequat lacus sodales dolor rutrum, vitae maximus quam faucibus. Nulla rutrum porta condimentum. Suspendisse potenti.
//
// Nulla libero nisi, tincidunt vel porttitor eu, egestas ut nisl. Nullam molestie ligula rhoncus, vulputate justo eu, interdum risus. Cras venenatis nulla quis mi cursus, eleifend pharetra mauris suscipit. Proin suscipit risus ante, quis pharetra leo varius non. Sed pellentesque massa in neque viverra, in vehicula dolor laoreet. Maecenas porta lorem quis purus tempus, at sodales nulla tincidunt. Curabitur laoreet ligula ipsum, ac consequat est commodo at. Quisque sagittis porttitor ante, id tempus lectus sodales eu. Proin blandit consectetur dui sit amet ornare. Donec at laoreet neque.
//
// Nulla facilisi. Mauris congue finibus ipsum, a congue arcu efficitur ut. Suspendisse nec consectetur nulla, non porttitor libero. Nulla vitae purus mi. Aliquam venenatis vel ex at pretium. Fusce vitae purus vel elit venenatis dapibus non et ipsum. Suspendisse interdum ipsum facilisis erat eleifend, nec gravida nulla auctor. Ut tincidunt, risus ut feugiat venenatis, tellus tortor vehicula ipsum, ac mattis elit lectus nec sapien. Sed malesuada ante vitae volutpat lobortis. Fusce id tempor neque, ac malesuada erat.
//
// Mauris mattis, justo id aliquet ullamcorper, ipsum nisl pellentesque mauris, sit amet posuere nunc quam sed velit. Nam nec ipsum quis nisl pellentesque semper. Curabitur lacus velit, lobortis in nisl eu, tristique sollicitudin elit. Donec in porttitor lacus. Suspendisse potenti. Nulla gravida cursus felis at malesuada. Aenean sed placerat turpis. In hac habitasse platea dictumst. Etiam cursus ut justo et interdum. Integer lobortis neque nec arcu maximus lobortis vel eget nibh.
//
// Proin elementum at risus id rutrum. Morbi sollicitudin elit id libero ultricies volutpat. Quisque at tellus finibus, blandit leo ut, tristique eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam fringilla id nibh at ultricies. Donec tempor est eu libero vestibulum, eu semper nunc semper. Pellentesque condimentum ullamcorper laoreet. Morbi aliquam sapien non erat posuere, sit amet tempor felis lobortis. Phasellus pellentesque dictum cursus. Quisque aliquam dapibus luctus. Mauris pretium fringilla diam, finibus feugiat lorem mollis facilisis.
//
// Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget nibh sit amet justo volutpat pretium in a mauris. Vivamus efficitur at sapien eu molestie. Donec egestas sem ac diam iaculis condimentum. Vestibulum malesuada metus eu bibendum tempus. Quisque at pretium nisi, in vulputate turpis. In hac habitasse platea dictumst. Duis id lectus eget mi tincidunt posuere ac vitae nulla. Morbi suscipit mi vitae dui auctor, in sagittis nibh dapibus. Nullam sed blandit neque, at commodo massa. Nunc non purus lacus. Nam augue ipsum, bibendum id enim in, porttitor sollicitudin quam. Etiam tempor, lectus tristique dapibus tempus, ligula quam euismod enim, nec hendrerit lectus diam ac nisl. Nulla eu nibh faucibus, mollis nulla vel, bibendum nulla. Curabitur consequat lacus sodales dolor rutrum, vitae maximus quam faucibus. Nulla rutrum porta condimentum. Suspendisse potenti.
//
// Nulla libero nisi, tincidunt vel porttitor eu, egestas ut nisl. Nullam molestie ligula rhoncus, vulputate justo eu, interdum risus. Cras venenatis nulla quis mi cursus, eleifend pharetra mauris suscipit. Proin suscipit risus ante, quis pharetra leo varius non. Sed pellentesque massa in neque viverra, in vehicula dolor laoreet. Maecenas porta lorem quis purus tempus, at sodales nulla tincidunt. Curabitur laoreet ligula ipsum, ac consequat est commodo at. Quisque sagittis porttitor ante, id tempus lectus sodales eu. Proin blandit consectetur dui sit amet ornare. Donec at laoreet neque.
//
// Nulla facilisi. Mauris congue finibus ipsum, a congue arcu efficitur ut. Suspendisse nec consectetur nulla, non porttitor libero. Nulla vitae purus mi. Aliquam venenatis vel ex at pretium. Fusce vitae purus vel elit venenatis dapibus non et ipsum. Suspendisse interdum ipsum facilisis erat eleifend, nec gravida nulla auctor. Ut tincidunt, risus ut feugiat venenatis, tellus tortor vehicula ipsum, ac mattis elit lectus nec sapien. Sed malesuada ante vitae volutpat lobortis. Fusce id tempor neque, ac malesuada erat.
//
// Mauris mattis, justo id aliquet ullamcorper, ipsum nisl pellentesque mauris, sit amet posuere nunc quam sed velit. Nam nec ipsum quis nisl pellentesque semper. Curabitur lacus velit, lobortis in nisl eu, tristique sollicitudin elit. Donec in porttitor lacus. Suspendisse potenti. Nulla gravida cursus felis at malesuada. Aenean sed placerat turpis. In hac habitasse platea dictumst. Etiam cursus ut justo et interdum. Integer lobortis neque nec arcu maximus lobortis vel eget nibh.
//
// Proin elementum at risus id rutrum. Morbi sollicitudin elit id libero ultricies volutpat. Quisque at tellus finibus, blandit leo ut, tristique eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam fringilla id nibh at ultricies. Donec tempor est eu libero vestibulum, eu semper nunc semper. Pellentesque condimentum ullamcorper laoreet. Morbi aliquam sapien non erat posuere, sit amet tempor felis lobortis. Phasellus pellentesque dictum cursus. Quisque aliquam dapibus luctus. Mauris pretium fringilla diam, finibus feugiat lorem mollis facilisis.
//
// Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget nibh sit amet justo volutpat pretium in a mauris. Vivamus efficitur at sapien eu molestie. Donec egestas sem ac diam iaculis condimentum. Vestibulum malesuada metus eu bibendum tempus. Quisque at pretium nisi, in vulputate turpis. In hac habitasse platea dictumst. Duis id lectus eget mi tincidunt posuere ac vitae nulla. Morbi suscipit mi vitae dui auctor, in sagittis nibh dapibus. Nullam sed blandit neque, at commodo massa. Nunc non purus lacus. Nam augue ipsum, bibendum id enim in, porttitor sollicitudin quam. Etiam tempor, lectus tristique dapibus tempus, ligula quam euismod enim, nec hendrerit lectus diam ac nisl. Nulla eu nibh faucibus, mollis nulla vel, bibendum nulla. Curabitur consequat lacus sodales dolor rutrum, vitae maximus quam faucibus. Nulla rutrum porta condimentum. Suspendisse potenti.
//
// Nulla libero nisi, tincidunt vel porttitor eu, egestas ut nisl. Nullam molestie ligula rhoncus, vulputate justo eu, interdum risus. Cras venenatis nulla quis mi cursus, eleifend pharetra mauris suscipit. Proin suscipit risus ante, quis pharetra leo varius non. Sed pellentesque massa in neque viverra, in vehicula dolor laoreet. Maecenas porta lorem quis purus tempus, at sodales nulla tincidunt. Curabitur laoreet ligula ipsum, ac consequat est commodo at. Quisque sagittis porttitor ante, id tempus lectus sodales eu. Proin blandit consectetur dui sit amet ornare. Donec at laoreet neque.
//
// Nulla facilisi. Mauris congue finibus ipsum, a congue arcu efficitur ut. Suspendisse nec consectetur nulla, non porttitor libero. Nulla vitae purus mi. Aliquam venenatis vel ex at pretium. Fusce vitae purus vel elit venenatis dapibus non et ipsum. Suspendisse interdum ipsum facilisis erat eleifend, nec gravida nulla auctor. Ut tincidunt, risus ut feugiat venenatis, tellus tortor vehicula ipsum, ac mattis elit lectus nec sapien. Sed malesuada ante vitae volutpat lobortis. Fusce id tempor neque, ac malesuada erat.
//
// Mauris mattis, justo id aliquet ullamcorper, ipsum nisl pellentesque mauris, sit amet posuere nunc quam sed velit. Nam nec ipsum quis nisl pellentesque semper. Curabitur lacus velit, lobortis in nisl eu, tristique sollicitudin elit. Donec in porttitor lacus. Suspendisse potenti. Nulla gravida cursus felis at malesuada. Aenean sed placerat turpis. In hac habitasse platea dictumst. Etiam cursus ut justo et interdum. Integer lobortis neque nec arcu maximus lobortis vel eget nibh.
//
// Proin elementum at risus id rutrum. Morbi sollicitudin elit id libero ultricies volutpat. Quisque at tellus finibus, blandit leo ut, tristique eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam fringilla id nibh at ultricies. Donec tempor est eu libero vestibulum, eu semper nunc semper. Pellentesque condimentum ullamcorper laoreet. Morbi aliquam sapien non erat posuere, sit amet tempor felis lobortis. Phasellus pellentesque dictum cursus. Quisque aliquam dapibus luctus. Mauris pretium fringilla diam, finibus feugiat lorem mollis facilisis.
//
// |Col 1|Col 2|Col3|
// ---|---|---|
// |1|2|3|
// |1|2|3|
// |1|2|3|
// |1|2|3|
//
// * bullet
// * another bullet
//     * an indent
//     * an indent
//     * an indent
//         1. oij
//         1. oij
//
// - [ ] task 1
// - [ ] task 2
// - [ ] task 3
// - [x] task 4`, profile: "https://lh3.googleusercontent.com/a-/AOh14GiKwYE1zxbR5GR7aWvHpvscMsRo6A_64WMCKyCEiA=s64"}}
	const expireCookie = context.req.cookies?.["expiry_date"] as string | undefined;
	if (!expireCookie) return {redirect: {destination: "/api/auth", permanent: false}}

	const auth = getAuthFromCookie(context.req.cookies);
	const drive = google.drive({version: "v3", auth});
	const fileId = context.query.file as string | undefined;


	if (!fileId) return {redirect: {destination: "https://drive.google.com", permanent: false}}

	//drive.files.get({ fileId: fileId, alt: 'media', fields: "*" }).then(result => { console.log(result); }).catch(err=>{ console.log(err); })
	let fileInfo;
	try {
		fileInfo = await drive.files.get({fileId, fields: "*"})
	} catch (e) {
		const err = e as Error;
		console.error(err);
		if (err.message === "Invalid Credentials") return {redirect: {destination: "/api/auth", permanent: false}}
		if (err.message.indexOf("File not found") !== -1) return {redirect: {destination: "https://drive.google.com"}}
		return handleError("Could not access file info.");
	}

	if (fileInfo.data.trashed) return {redirect: {destination: "https://drive.google.com", permanent: false}}
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
		if (err.message === "Invalid Credentials") return {redirect: {destination: "/api/auth", permanent: false}}
		return handleError("Could not access file data.");
	}
	return { props: {
		name, fileName, profile, data: fileData.data as string, file: fileId
	}};
}


export default Home
