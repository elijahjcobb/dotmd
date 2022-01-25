/*
 * Elijah Cobb
 * github.com/elijahjcobb
 * ejcobb@mtu.edu
 */

import {FC} from "react";
import styles from "../styles/Container.module.scss";
import {NavBar} from "./NavBar";

export interface PageProps {

}

export const Container: FC<PageProps> = props => {

	return (<div className={styles.container}>
		{/*<NavBar/>*/}
	</div>);

};