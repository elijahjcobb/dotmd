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
import {EditorTopButton} from "./EditorTopButton";
import {EditTopBarSelector} from "./EditTopBarSelector";

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

export const SketchColorValue: string[] = [
	"#f44336",
	"#9c27b0",
	"#2196f3",
	"#4caf50",
	"#ffeb3b",
	"#ff9800",
	"#000"
];

export enum SketchColor {
	RED,
	PURPLE,
	BLUE,
	GREEN,
	YELLOW,
	ORANGE,
	BLACK,
}

export enum SketchSize {
	TINY,
	SMALL,
	MEDIUM,
	BIG,
	EXTRA
}

export const SketchSizeValue: number[] = [
	2,
	4,
	8,
	16,
	32
];

export const Sketch: FC<SketchProps> = props => {

	const canvasRef = useRef<ReactSketchCanvasRef | null>()
	const [mode, setMode] = useState<SketchMode>(SketchMode.PEN);
	const [size, setSize] = useState<SketchSize>(SketchSize.SMALL);
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
				<EditorTopButton
					onClick={() => {
						const res = window.confirm("Are you sure you want to close this sketch?")
						if (res) props.onClose();
					}}>
					<CloseIcon/>
				</EditorTopButton>
				<div className={styles.group}>
					<EditorTopButton
						onClick={() => {
							const res = window.confirm("Are you sure you want to clear this sketch?")
							if (res) canvas().clearCanvas();
						}}>
						<Delete/>
					</EditorTopButton>
					<EditorTopButton
						onClick={() => {
							canvas().exportImage("png").then(img => {
								const downloadLink = document.createElement('a');
								document.body.appendChild(downloadLink);
								downloadLink.href = img;
								downloadLink.target = '_self';
								downloadLink.download = "dotmd-sketch.png";
								downloadLink.click();
							}).catch(console.error);
						}}>
						<FileDownload/>
					</EditorTopButton>
				</div>
				<div className={styles.group}>
					<EditorTopButton onClick={() => canvas().undo()}>
						<UndoIcon/>
					</EditorTopButton>
					<EditorTopButton onClick={() => canvas().redo()}>
						<RedoIcon/>
					</EditorTopButton>
				</div>
				<div className={styles.group}>
					<EditTopBarSelector onChange={setMode} value={mode}>
						<Brush/>
						<FormatPaint/>
					</EditTopBarSelector>
					<EditTopBarSelector onChange={setSize} value={size}>
						<Circle style={{width: 8}} />
						<Circle style={{width: 12}} />
						<Circle style={{width: 16}} />
						<Circle style={{width: 20}} />
						<Circle style={{width: 32}} />
					</EditTopBarSelector>
					<EditTopBarSelector onChange={setColor} value={color}>
						<Circle style={{color: SketchColorValue[SketchColor.BLACK]}}/>
						<Circle style={{color: SketchColorValue[SketchColor.BLUE]}}/>
						<Circle style={{color: SketchColorValue[SketchColor.RED]}}/>
						<Circle style={{color: SketchColorValue[SketchColor.PURPLE]}}/>
						<Circle style={{color: SketchColorValue[SketchColor.GREEN]}}/>
						<Circle style={{color: SketchColorValue[SketchColor.YELLOW]}}/>
						<Circle style={{color: SketchColorValue[SketchColor.ORANGE]}}/>
					</EditTopBarSelector>
				</div>
				{props.sketch && <FileCopyIcon className={styles.btn} onClick={() => save(true)}/>}
				<SaveIcon className={styles.btn} onClick={() => save(false)}/>
			</div>
			<ReactSketchCanvas
				// @ts-ignore
				ref={canvasRef}
				strokeColor={SketchColorValue[color]}
				strokeWidth={SketchSizeValue[size]}
				eraserWidth={SketchSizeValue[size * 3]}
				className={styles.canvas}
				allowOnlyPointerType={"pen"}
			/>
			{/*<div className={styles.grabber}/>*/}
		</div>
	</div>);

};
