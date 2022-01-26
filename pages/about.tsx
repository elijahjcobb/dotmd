/*
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 */

import type {NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps} from "next";
import {signIn, useSession} from "next-auth/react";
import styles from "../styles/About.module.scss";
import {FC, useCallback} from "react";

interface PageProps {

}

const SignInButton: FC = () => {

	const {data: session} = useSession();

	const login = useCallback(() => {
		signIn("google", {callbackUrl: "https://dotmd.app/"}).catch(console.error)
	}, []);

	return <span
		className={styles.button}
		onClick={() => {
			session ? window.open("/", "_self") : login();
		}}
	>{session ? "Open App" : "Sign In"}</span>
}

const Page: NextPage<PageProps> = () => {



	return (<div className={styles.body}>
		<nav className={styles.nav}>
			<div className={styles.left}>
				<img src={"/dotmd.png"} alt={"logo"}/>
				<h1>dotmd.app</h1>
			</div>
			<SignInButton/>
		</nav>
		<section>
			<img src={"/examples/editor.png"} alt={"editor"}/>
			<div>
				<h2>{"Your new Markdown Application!"}</h2>
				<span>{"A web-based markdown editor accessible on any device. Simply sign in with Google and all your files will be synced automatically. Full markdown support, LaTeX, Github syntax highlighting, and much more!"}</span>
				<SignInButton/>
			</div>
		</section>
		<section>
			<img src={"/examples/fs.png"} alt={"fs"}/>
			<div>
				<h2>Intuitive Cloud File System</h2>
				<span>{"Create directories or markdown files on the fly. Rename, delete, or drag and drop. It is just like any other file system."}</span>
			</div>
		</section>
		<section>
			<img src={"/examples/pwa.png"} alt={"fs"}/>
			<div>
				<h2>Installable (PWA)</h2>
				<span>{"Using the latest Chrome APIs, dotmd is installable as a Progressive Web App (PWA). With just one click, dotmd operates like any other app on your computer."}</span>
			</div>
		</section>
		<section>
			<img src={"/examples/pdf.png"} alt={"pdf"}/>
			<div>
				<h2>PDF Export Support</h2>
				<span>{"Easily export to a PDF by printing the page. The app will handle formatting for you."}</span>
			</div>
		</section>
		<section>
			<img src={"/examples/dark.png"} alt={"dark"}/>
			<div>
				<h2>Dark mode</h2>
				<span>{"Of course you can't have an editor without dark mode. We didn't forget about it."}</span>
			</div>
		</section>
		<section>
			<img src={"/examples/just-editor.png"} alt={"just editor"}/>
			<div>
				<h2>Monaco Editor (VS Code)</h2>
				<span>{"The editor is powered by the same editor that runs VS code, use popular keyboard shortcuts, refactoring, etc. All in the cloud!"}</span>
			</div>
		</section>
		<section>
			<img src={"/examples/just-preview.png"} alt={"just preview"}/>
			<div>
				<h2>Full Markdown Support</h2>
				<span>{"Full markdown support! Lists, tables, headings, formatting. Full LaTeX (KaTeX) support and LaTeX font theme available. Full syntax highlighting for source code blocks."}</span>
			</div>
		</section>
		<footer>
			<span>Created by <a rel={"noreferrer"} href={"https://elijahcobb.com"} target={"_blank"}>Elijah Cobb</a>.</span>
		</footer>
	</div>);
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
