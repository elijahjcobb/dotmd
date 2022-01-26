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
import {BreadcrumbItem} from "./BreadcrumbItem";

export interface NavBarProps {
	path: IDirectory[];
}

export const NavBar: FC<NavBarProps> = props => {

	const session = useSession();
	const user: string | undefined | null = session.data?.user?.image;

	return (<div className={styles.container}>
		<div className={styles.header}>
			<img onClick={() => {
				window.open("/", "_self")
			}} src={"/dotmd-512.png"} alt={"logo"}/>
			<Breadcrumbs maxItems={8} aria-label="breadcrumb">
				{props.path.map((v, i) => {
					return <BreadcrumbItem key={i} directory={v}/>
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