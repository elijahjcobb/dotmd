/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC, useEffect, useRef, useState} from "react";
import styles from "../../styles/Sketch.module.scss";
import {ReactSketchCanvas, ReactSketchCanvasRef} from "react-sketch-canvas";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import {FileDownload, Delete, Brush, FormatPaint, Circle} from "@mui/icons-material";
import {ToastConfig} from "../Toast";
import {ISketch} from "../local-types";
import {EditorTopButton} from "./EditorTopButton";
import {EditTopBarSelector} from "./EditTopBarSelector";
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import MouseIcon from '@mui/icons-material/Mouse';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import PanToolIcon from '@mui/icons-material/PanTool';

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
	"#000",
	"#2196f3",
	"#f44336",
	"#9c27b0",
	"#4caf50",
	"#ffeb3b",
	"#ff9800",
];

export enum SketchColor {
	BLACK,
	BLUE,
	RED,
	PURPLE,
	GREEN,
	YELLOW,
	ORANGE,
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

export enum InputType {
	ALL,
	TOUCH,
	MOUSE,
	PEN
}

export const InputTypeValue: string[] = [
	"all",
	"touch",
	"mouse",
	"pen"
]

export enum Hand {
	LEFT,
	RIGHT
}

export const Sketch: FC<SketchProps> = props => {

	const canvasRef = useRef<ReactSketchCanvasRef | null>()
	const [mode, setMode] = useState<SketchMode>(SketchMode.PEN);
	const [size, setSize] = useState<SketchSize>(SketchSize.SMALL);
	const [color, setColor] = useState<number>(SketchColor.BLACK);
	const [inputType, setInputType] = useState<InputType>(InputType.PEN);
	const [hand, setHand] = useState<Hand>(Hand.LEFT);

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
		<div className={styles.container} style={{flexDirection: hand === Hand.LEFT ? "row-reverse" : "row"}}>
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
					<EditTopBarSelector hand={hand} value={inputType} onChange={setInputType}>
						<AllInclusiveIcon/>
						<TouchAppIcon/>
						<MouseIcon/>
						<BorderColorIcon/>
					</EditTopBarSelector>
					<EditTopBarSelector hand={hand} value={hand} onChange={setHand}>
						<PanToolIcon style={{transform: "rotateY(180deg)"}}/>
						<PanToolIcon/>
					</EditTopBarSelector>
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
					<EditTopBarSelector hand={hand} onChange={setMode} value={mode}>
						<Brush/>
						<FormatPaint/>
					</EditTopBarSelector>
					<EditTopBarSelector hand={hand} onChange={setSize} value={size}>
						<Circle style={{width: 8}} />
						<Circle style={{width: 12}} />
						<Circle style={{width: 16}} />
						<Circle style={{width: 20}} />
						<Circle style={{width: 32}} />
					</EditTopBarSelector>
					<EditTopBarSelector hand={hand} onChange={setColor} value={color}>
						<Circle style={{color: SketchColorValue[SketchColor.BLACK]}}/>
						<Circle style={{color: SketchColorValue[SketchColor.BLUE]}}/>
						<Circle style={{color: SketchColorValue[SketchColor.RED]}}/>
						<Circle style={{color: SketchColorValue[SketchColor.PURPLE]}}/>
						<Circle style={{color: SketchColorValue[SketchColor.GREEN]}}/>
						<Circle style={{color: SketchColorValue[SketchColor.YELLOW]}}/>
						<Circle style={{color: SketchColorValue[SketchColor.ORANGE]}}/>
					</EditTopBarSelector>
				</div>
				{props.sketch && <EditorTopButton onClick={() => save(true)}>
					<FileCopyIcon/>
				</EditorTopButton>}
				<EditorTopButton onClick={() => save(false)}>
					<SaveIcon/>
				</EditorTopButton>
			</div>
			<div className={styles.canvasContainer}>
				<ReactSketchCanvas
					// @ts-ignore
					ref={canvasRef}
					strokeColor={SketchColorValue[color]}
					strokeWidth={SketchSizeValue[size]}
					eraserWidth={SketchSizeValue[size * 3]}
					className={styles.canvas}
					allowOnlyPointerType={InputTypeValue[inputType]}
				/>
			</div>
			{/*<div className={styles.grabber}/>*/}
		</div>
	</div>);

};
