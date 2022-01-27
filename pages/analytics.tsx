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
	load: {name: string, count: number}[];
	user: IUser[];
}

const Page: NextPage<PageProps> = props => {
	return (
		<div className={styles.Analytics}>
			<NavBar path={[]}/>
			<div className={styles.main}>
				<div className={styles.counts}>
					{props.count.map((v, i) => {
						return <div key={i} className={styles.count}>
							<span className={styles.countName}>{v.count}</span>
							<span className={styles.countValue}>{v.name}</span>
						</div>
					})}
				</div>
				<div className={styles.counts}>
					{props.load.map((v, i) => {
						return <div key={i} className={styles.count}>
							<span className={styles.countName}>{v.count}</span>
							<span className={styles.countValue}>{v.name}</span>
						</div>
					})}
				</div>
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
			load: [
				{name: "Loads", count: await (new SiQuery(Analytics, {})).count()},
				{name: "Directory Loads", count: await (new SiQuery(Analytics, {targetType: "dir"})).count()},
				{name: "File Loads", count: await (new SiQuery(Analytics, {targetType: "file"})).count()},
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
