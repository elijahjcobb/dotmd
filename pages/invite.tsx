/*
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 */

import type {NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps} from "next";
import {NavBar} from "../components/NavBar";

interface PageProps {

}

const Page: NextPage<PageProps> = () => {
	return (
		<div>
			<NavBar path={[]}/>
			<span>No invite. Email <a href={"mailto:elijahjcobb@gmail.com"}>elijahjcobb@gmail.com</a> for invite.</span>
			<a href={"/"}>Refresh</a>
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
