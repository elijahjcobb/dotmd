/*
 * Elijah Cobb
 * github.com/elijahjcobb
 * ejcobb@mtu.edu
 */

import {FC} from "react";
import styles from "../styles/NavBar.module.scss";
import { useSession, signIn, signOut } from "next-auth/react"
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import {IDirectory} from "./local-types";

export interface NavBarProps {
	path: IDirectory[];
}

export const NavBar: FC<NavBarProps> = props => {

	const session = useSession();
	const user: string | undefined | null = session.data?.user?.image;

	return (<div className={styles.container}>
		<div className={styles.header}>
			<img src={"/oafa.png"} alt={"logo"}/>
			<Breadcrumbs maxItems={8} aria-label="breadcrumb">
				{props.path.map((v, i) => {
					return <Link key={i} underline="hover" color="inherit" href={"/view/" + v.id}>{v.name}</Link>
				})}
			</Breadcrumbs>
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