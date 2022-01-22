/*
 * Elijah Cobb
 * github.com/elijahjcobb
 * ejcobb@mtu.edu
 */

import {FC} from "react";
import styles from "../styles/NavBar.module.scss";
import { useSession, signIn, signOut } from "next-auth/react"

export interface NavBarProps {

}

export const NavBar: FC<NavBarProps> = props => {

	const session = useSession();
	const user: string | undefined | null = session.data?.user?.image;

	return (<div className={styles.container}>
		<div className={styles.header}>
			<img src={"/oafa.png"} alt={"logo"}/>
			<span>dotmd.app</span>
		</div>
		{user ? <div className={styles.profile}>
			<img
				onClick={() => signOut()}
				alt={"profile"}
				className={styles.headshot}
				src={user ?? ""}/>
		</div> : <span
			onClick={() => signIn("google")}
			className={styles.signIn}
		>Sign In</span>}
	</div>);

};