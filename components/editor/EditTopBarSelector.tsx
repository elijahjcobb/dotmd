/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC, PropsWithChildren, ReactElement, useState} from "react";
import styles from "../../styles/EditTopBarSelector.module.scss";
import CloseIcon from '@mui/icons-material/Close';

export interface EditTopBarSelectorProps {
	value: number;
	onChange: (value: number) => void;
}

export function EditTopBarSelector(props: PropsWithChildren<EditTopBarSelectorProps>): ReactElement {

	const children = props.children as ReactElement[];
	const [showOptions, setShowOptions] = useState(false);


	return (<div className={styles.container} onClick={() => setShowOptions(v => !v)}>
		<div className={styles.item + " " + styles.default}>
			{showOptions ? <CloseIcon/> : <div>{children[props.value]}</div>}
		</div>
		<div className={styles.options + (showOptions ? (" " + styles.show) : "")}>
			{children.map((e, k) => {
				return <div
					onClick={() => props.onChange(k)}
					className={styles.item + ((k === props.value) ? (" " + styles.selected) : "")} key={k}>
					{e}
				</div>
			})}
		</div>
	</div>);
}