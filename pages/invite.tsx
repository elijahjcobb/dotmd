/*
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 */

import type {NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps} from "next";
import {NavBar} from "../components/NavBar";
import styles from "../styles/InvitePage.module.scss"

interface PageProps {

}

const Page: NextPage<PageProps> = () => {
	return (
		<div className={styles.main}>
			<NavBar path={[]}/>
			<div className={styles.center}>
				<span>dotmd is <b>invite only</b>. You have not been invited. Please email <a href={"mailto:elijahjcobb@gmail.com"}>elijahjcobb@gmail.com</a> for an invite.</span>
				<a className={styles.tryagain} href={"/"}>Try Again</a>
			</div>
		</div>
	);
};

// export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
// 	return {
// 		props: {}
// 	}
// }

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
