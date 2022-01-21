/*
 * Elijah Cobb
 * github.com/elijahjcobb
 * ejcobb@mtu.edu
 */

import {FC} from "react";
import styles from "../styles/NavBar.module.scss";

export interface NavBarProps {

}

export const NavBar: FC<NavBarProps> = props => {

	return (<div className={styles.container}>
		<div className={styles.header}>
			<img src={"/oafa.png"} alt={"logo"}/>
			<span>dotmd.app</span>
		</div>
		<div>

		</div>
	</div>);

};