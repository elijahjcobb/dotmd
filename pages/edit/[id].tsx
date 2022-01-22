/*
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 */

import type {NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps} from "next";

interface PageProps {
	id: string;
}

const Page: NextPage<PageProps> = props => {
	return (
		<span>Hello, {props.id}!</span>
	);
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {

	const fileId = context.query.id as string;

	return {
		props: {id: fileId}
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
