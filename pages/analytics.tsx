/*
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 */

import type {NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps} from "next";
import {getEmail, getUserForEmail} from "../db/auth-silicon";
import {NavBar} from "../components/NavBar";
import {SiQuery} from "@element-ts/silicon";
import {Analytics, Attachment, Directory, File, SignUpInvite, User} from "../db/DB";
import {IInvite, IUser} from "../components/local-types";
import styles from "../styles/Analytics.module.scss";

interface PageProps {
	count: {name: string, count: number}[];
	dir: {name: string, count: number}[];
	file: {name: string, count: number}[];
	user: IUser[];
	invites: IInvite[];
}

const Page: NextPage<PageProps> = props => {
	return (
		<div className={styles.Analytics}>
			<NavBar path={[]}/>
			<div className={styles.main}>
				<h1>Counts</h1>
				<div className={styles.counts}>
					{props.count.map((v, i) => {
						return <div key={i} className={styles.count}>
							<span className={styles.countName}>{v.count}</span>
							<span className={styles.countValue}>{v.name}</span>
						</div>
					})}
				</div>
				<h1>Directory Analytics</h1>
				<div className={styles.counts}>
					{props.dir.map((v, i) => {
						return <div key={i} className={styles.count}>
							<span className={styles.countName}>{v.count}</span>
							<span className={styles.countValue}>{v.name}</span>
						</div>
					})}
				</div>
				<h1>File Analytics</h1>
				<div className={styles.counts}>
					{props.file.map((v, i) => {
						return <div key={i} className={styles.count}>
							<span className={styles.countName}>{v.count}</span>
							<span className={styles.countValue}>{v.name}</span>
						</div>
					})}
				</div>
				<h1>Users</h1>
				<div className={styles.users}>
					{props.user.map((v, i) => {
						return <div key={i} className={styles.user}>
							<span className={styles.userName}>{v.email}</span>
						</div>
					})}
				</div>
				<h1>Invites</h1>
				<div className={styles.users}>
					<button onClick={() => {
						let email = prompt("Enter Email", "");
						if (email == null || email == "") return;
						window.open("/api/invite/create?email=" + email, "_self");
					}}>Create</button>
					{props.invites.map((v, i) => {
						return <div key={i} className={styles.user}>
							<span onClick={() => {
								window.open("/api/invite/delete?email=" + v.email, "_self");
							}} className={styles.userName}>{v.email}</span>
						</div>
					})}
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {

	const email = await getEmail(context);
	const user = await getUserForEmail(email);
	if (!user) return {redirect: {destination: "/", permanent: false}};
	if (user.get("email") !== "ejcobb@mtu.edu") return {redirect: {destination: "/", permanent: false}};

	let dView = await (new SiQuery(Analytics, {targetType: "dir", actionType: "view"})).count()
	const dCreate = await (new SiQuery(Analytics, {targetType: "dir", actionType: "create"})).count()
	const dMove = await (new SiQuery(Analytics, {targetType: "dir", actionType: "move"})).count()
	const dUpdate = await (new SiQuery(Analytics, {targetType: "dir", actionType: "update"})).count()
	const dDelete = await (new SiQuery(Analytics, {targetType: "dir", actionType: "delete"})).count()

	const fView = await (new SiQuery(Analytics, {targetType: "file", actionType: "view"})).count()
	const fCreate = await (new SiQuery(Analytics, {targetType: "file", actionType: "create"})).count()
	const fMove = await (new SiQuery(Analytics, {targetType: "file", actionType: "move"})).count()
	const fUpdate = await (new SiQuery(Analytics, {targetType: "file", actionType: "update"})).count()
	const fDelete = await (new SiQuery(Analytics, {targetType: "file", actionType: "delete"})).count()
	dView -= (dCreate + dMove + dUpdate + dDelete + fCreate + fMove + fUpdate + fDelete);


	return {
		props: {
			count: [
				{
					name: "Users",
					count: await (new SiQuery(User, {})).count(),
				},
				{
					name: "Directories",
					count: await (new SiQuery(Directory, {})).count(),
				},
				{
					name: "Files",
					count: await (new SiQuery(File, {})).count(),
				},
				{
					name: "Attachments",
					count: await (new SiQuery(Attachment, {})).count(),
				}
			],
			dir: [
				{name: "View", count: dView},
				{name: "Create", count: dCreate},
				{name: "Update", count: dUpdate},
				{name: "Move", count: dMove},
				{name: "Delete", count: dDelete},
			],
			file: [
				{name: "View", count: fView},
				{name: "Create", count: fCreate},
				{name: "Update", count: fUpdate},
				{name: "Move", count: fMove},
				{name: "Delete", count: fDelete},
			],
			user: (await (new SiQuery(User,{}).getAll())).sort((a, b) => b.getUpdatedAt() - a.getUpdatedAt()).map(v => v.toJSON()),
			invites: (await SiQuery.init(SignUpInvite, {used: false}).getAll()).map(v => v.toJSON())
		}
	}
}

// export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
// 	return {
// 		props: {}
// 	}
// }

// export const getStaticPaths: GetStaticPaths = async () => {
// 	return {
// 		paths: [],
// 		fallback: false
// 	};
// }

export default Page;
