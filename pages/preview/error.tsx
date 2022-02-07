/*
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 */

import type {NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps} from "next";
import {NavBar} from "../../components/NavBar";
import styles from "../../styles/InvitePage.module.scss"

interface PageProps {
	id: string;
}

const Page: NextPage<PageProps> = props => {
	return (
		<div className={styles.main}>
			<NavBar path={[]}/>
			<div className={styles.center}>
				<span>This file cannot be previewed. If you are the owner, set the file access to public in the editor.</span>
				<a className={styles.tryagain} href={"/preview/" + props.id}>Try Again</a>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
	return {
		props: {id: context.query.id as string}
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
