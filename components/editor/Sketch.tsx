/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC, useCallback, useEffect, useRef, useState} from "react";
import styles from "../../styles/Sketch.module.scss";
import {ReactSketchCanvas, ReactSketchCanvasRef} from "react-sketch-canvas";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import ToggleButton from "@mui/material/ToggleButton";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import {FileDownload, Delete, Brush, FormatPaint, Circle} from "@mui/icons-material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {ToastConfig} from "../Toast";
import {ISketch} from "../local-types";

export interface SketchProps {
	sketch: ISketch | null;
	onClose: () => void;
	onSave: (img: {svg: string, paths: string}, copy: boolean) => void;
	setToast: (config: ToastConfig | undefined) => void
}

export enum SketchMode {
	PEN,
	ERASER
}

export enum SketchColor {
	RED = "#f44336",
	PURPLE = "#9c27b0",
	BLUE = "#2196f3",
	GREEN = "#4caf50",
	YELLOW = "#ffeb3b",
	ORANGE = "#ff9800",
	BLACK = "#000"
}

export enum SketchSize {
	SMALL = 2,
	MEDIUM = 4,
	BIG = 8,
	EXTRA = 16
}

export const Sketch: FC<SketchProps> = props => {

	const canvasRef = useRef<ReactSketchCanvasRef | null>()
	const [mode, setMode] = useState<SketchMode>(SketchMode.PEN);
	const [size, setSize] = useState<SketchSize>(SketchSize.MEDIUM);
	const [color, setColor] = useState<SketchColor>(SketchColor.BLACK);

	const canvas: () => ReactSketchCanvasRef = () => {
		const canvas = canvasRef.current;
		if (!canvas) throw new Error("Canvas is undefined.");
		return canvas;
	}

	const save = (copy: boolean) => {
		(async () => {
			const svg = await canvas().exportSvg();
			const paths = JSON.stringify(await canvas().exportPaths());
			props.onSave({svg, paths}, copy)
		})().catch(err => {
			console.error(err);
			props.setToast({message: "Failed to save sketch.", severity: "error"})
		})
	}

	useEffect(() => canvas().eraseMode(mode == SketchMode.ERASER), [mode]);

	useEffect(() => {
		if (!props.sketch) return;
		try {
			canvas().loadPaths(JSON.parse(props.sketch.paths));
		} catch (e) {
			console.error(e);
			props.setToast({message: "Error decoding sketch.", severity: "error"});
		}
	}, [])

	return (<div className={styles.page}>
		<div className={styles.container}>
			<div className={styles.top + " " + styles.group}>
				<CloseIcon
					className={styles.btn}
					onClick={() => {
						const res = window.confirm("Are you sure you want to close this sketch?")
						if (res) props.onClose();
					}}
				/>
				<div className={styles.group}>
					<Delete
						className={styles.btn}
						onClick={() => {
							const res = window.confirm("Are you sure you want to clear this sketch?")
							if (res) canvas().clearCanvas();
						}}
					/>
					<FileDownload
						className={styles.btn}
						onClick={() => {
							canvas().exportImage("png").then(img => {
								const downloadLink = document.createElement('a');
								document.body.appendChild(downloadLink);
								downloadLink.href = img;
								downloadLink.target = '_self';
								downloadLink.download = "dotmd-sketch.png";
								downloadLink.click();
							}).catch(console.error);
						}}
					/>
				</div>
				<div className={styles.group}>
					<UndoIcon
						className={styles.btn}
						onClick={() => canvas().undo()}
					/>
					<RedoIcon
						className={styles.btn}
						onClick={() => canvas().redo()}
					/>
				</div>
				<div className={styles.group}>
					<ToggleButtonGroup
						value={mode}
						exclusive
						onChange={(
							event: React.MouseEvent<HTMLElement>,
							newValue: SketchMode
						) => {
							setMode(newValue);
						}}
					>
						<ToggleButton value={SketchMode.PEN}>
							<Brush />
						</ToggleButton>
						<ToggleButton value={SketchMode.ERASER}>
							<FormatPaint />
						</ToggleButton>
					</ToggleButtonGroup>
					<ToggleButtonGroup
						value={size}
						exclusive
						onChange={(
							event: React.MouseEvent<HTMLElement>,
							newValue: SketchSize
						) => {
							setSize(newValue);
						}}
					>
						<ToggleButton value={SketchSize.SMALL}>
							<Circle style={{width: 12}} />
						</ToggleButton>
						<ToggleButton value={SketchSize.MEDIUM}>
							<Circle style={{width: 16}} />
						</ToggleButton>
						<ToggleButton value={SketchSize.BIG}>
							<Circle style={{width: 20}} />
						</ToggleButton>
						<ToggleButton value={SketchSize.EXTRA}>
							<Circle style={{width: 32}} />
						</ToggleButton>
					</ToggleButtonGroup>
					<ToggleButtonGroup
						value={color}
						exclusive
						onChange={(
							event: React.MouseEvent<HTMLElement>,
							newValue: SketchColor
						) => {
							setColor(newValue);
						}}
					>
						<ToggleButton value={SketchColor.BLACK}><Circle style={{color: SketchColor.BLACK}}/></ToggleButton>
						<ToggleButton value={SketchColor.BLUE}><Circle style={{color: SketchColor.BLUE}}/></ToggleButton>
						<ToggleButton value={SketchColor.RED}><Circle style={{color: SketchColor.RED}}/></ToggleButton>
						<ToggleButton value={SketchColor.PURPLE}><Circle style={{color: SketchColor.PURPLE}}/></ToggleButton>
						<ToggleButton value={SketchColor.GREEN}><Circle style={{color: SketchColor.GREEN}}/></ToggleButton>
						<ToggleButton value={SketchColor.YELLOW}><Circle style={{color: SketchColor.YELLOW}}/></ToggleButton>
						<ToggleButton value={SketchColor.ORANGE}><Circle style={{color: SketchColor.ORANGE}}/></ToggleButton>
					</ToggleButtonGroup>
				</div>
				{props.sketch && <FileCopyIcon className={styles.btn} onClick={() => save(true)}/>}
				<SaveIcon className={styles.btn} onClick={() => save(false)}/>
			</div>
			<ReactSketchCanvas
				// @ts-ignore
				ref={canvasRef}
				strokeColor={color}
				strokeWidth={size}
				eraserWidth={size * 3}
				className={styles.canvas}
			/>
			<div className={styles.grabber}>

			</div>
		</div>
	</div>);

};
