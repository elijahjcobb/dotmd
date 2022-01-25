/*
 * Elijah Cobb
 * github.com/elijahjcobb
 * ejcobb@mtu.edu
 */

import {FC} from "react";
import styles from "../styles/BreadcrumbItem.module.scss";
import {useDrop} from "react-dnd";
import {IDirectory} from "./local-types";
import Link from "@mui/material/Link";

export interface BreadcrumbItemProps {
	directory: IDirectory;
}

export const BreadcrumbItem: FC<BreadcrumbItemProps> = props => {

	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		// The type (or types) to accept - strings or symbols
		accept: 'BOX',
		// Props to collect,
		drop: () => ({ id: props.directory.id }),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop()
		})
	}))

	return (<Link className={isOver ? styles.dropper : styles.default} ref={drop} underline="hover" color="inherit" href={"/view/" + props.directory.id}>{props.directory.name}</Link>);

};