/*
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 */

import type {NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps} from "next";
import {getEmail, getUserForEmail} from "../db/auth-silicon";
import {NavBar} from "../components/NavBar";
import {SiQuery} from "@element-ts/silicon";
import {Analytics, Attachment, Directory, File, User} from "../db/DB";
import {IUser} from "../components/local-types";
import styles from "../styles/Analytics.module.scss";

interface PageProps {
	count: {name: string, count: number}[];
	dir: {name: string, count: number}[];
	file: {name: string, count: number}[];
	user: IUser[];
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
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {

	const email = await getEmail(context);
	const user = await getUserForEmail(email);
	if (!user) return {redirect: {destination: "/", permanent: false}};
	if (user.get("email") !== "ejcobb@mtu.edu") return {redirect: {destination: "/", permanent: false}};

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
				{name: "View", count: await (new SiQuery(Analytics, {targetType: "dir", actionType: "view"})).count()},
				{name: "Create", count: await (new SiQuery(Analytics, {targetType: "dir", actionType: "create"})).count()},
				{name: "Update", count: await (new SiQuery(Analytics, {targetType: "dir", actionType: "update"})).count()},
				{name: "Move", count: await (new SiQuery(Analytics, {targetType: "dir", actionType: "move"})).count()},
				{name: "Delete", count: await (new SiQuery(Analytics, {targetType: "dir", actionType: "delete"})).count()},
			],
			file: [
				{name: "View", count: await (new SiQuery(Analytics, {targetType: "file", actionType: "view"})).count()},
				{name: "Create", count: await (new SiQuery(Analytics, {targetType: "file", actionType: "create"})).count()},
				{name: "Update", count: await (new SiQuery(Analytics, {targetType: "file", actionType: "update"})).count()},
				{name: "Move", count: await (new SiQuery(Analytics, {targetType: "file", actionType: "move"})).count()},
				{name: "Delete", count: await (new SiQuery(Analytics, {targetType: "file", actionType: "delete"})).count()},
			],
			user: (await (new SiQuery(User,{}).getAll())).sort((a, b) => b.getUpdatedAt() - a.getUpdatedAt()).map(v => v.toJSON())
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
