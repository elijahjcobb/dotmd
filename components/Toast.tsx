/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {createContext, FC, useState} from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertColor} from '@mui/material/Alert';

export interface ToastConfig {
	message: string;
	severity?: AlertColor;
}

export interface ToastProps {
	close?: () => void;
	config?: ToastConfig;
}

export const Toast: FC<ToastProps> = props => {

	return (<Snackbar
		anchorOrigin={{
			horizontal: "center",
			vertical: "bottom"
		}}
		open={props.config !== undefined}
		autoHideDuration={3000}
		onClose={props.close}
	>
		<MuiAlert onClose={props.close} severity={props.config?.severity ?? "info"} sx={{ minWidth: 280 }}>
			{props.config?.message}
		</MuiAlert>
	</Snackbar>);

};
