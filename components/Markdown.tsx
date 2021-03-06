/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC, useState} from "react";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import Highlight, {defaultProps, Language} from "prism-react-renderer";
import ReactMarkdown from "react-markdown";
import 'katex/dist/katex.min.css'
import vsDark from 'prism-react-renderer/themes/vsDark';
import vsLight from 'prism-react-renderer/themes/vsLight';
import styles from "../styles/Markdown.module.scss";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {ToastConfig} from "./Toast";

export interface MarkdownProps {
	value: string;
	className?: string;
	dark: boolean;
	academicTheme: boolean;
	setToast: (config: ToastConfig | undefined) => void
}

export const Markdown: FC<MarkdownProps> = markdownProps => {

	return <ReactMarkdown
		className={styles.mdDefault + " " + (markdownProps.className ?? "") + " printContainer " + (markdownProps.academicTheme ? styles.academicStyleMD : styles.workStyleMD) + (markdownProps.dark ? " " + styles.darkmd : "")}
		remarkPlugins={[remarkGfm, remarkMath]}
		rehypePlugins={[rehypeKatex]}
		components={{
			code({node, inline, className, children, ...props}) {
				const match = /language-(\w+)/.exec(className || '')
				return !inline && match ? (
					<div className={styles.code}>
						<Highlight {...defaultProps} theme={markdownProps.dark ? vsDark : vsLight} code={String(children).replace(/\n$/, '')} language={(match[1] ?? "markup") as Language}>
							{({ className, style, tokens, getLineProps, getTokenProps }) => (
								<pre className={className} style={style}>{tokens.map((line, i) => (
									<div key={i} {...getLineProps({line})}>
										{line.map((token, key) => (
											<span key={key} {...getTokenProps({token})} />
										))}
									</div>
								))}
								</pre>
							)}
						</Highlight>
						<ContentCopyIcon onClick={() => {
							const code = children[0];
							navigator.clipboard.writeText(code as string).catch(console.error);
							markdownProps.setToast({message: "Copied to Clipboard", severity: "info"});
						}} className={styles.copyButton}/>
					</div>
				) : (
					<code className={styles.inlineCode} {...props}>
						{children}
					</code>
				)
			},
			a({node, className, children}) {
				// @ts-ignore
				let href = node.properties.href as string;
				if (href.indexOf("http://") === -1 && href.indexOf("https://") === -1) href = "https://" + href
				return <a target={"_blank"} rel={"noreferrer"} href={href} className={className}>{children}</a>
			}
		}}
	>{markdownProps.value}</ReactMarkdown>;

}