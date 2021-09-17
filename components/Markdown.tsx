/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC} from "react";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import Highlight, {defaultProps, Language} from "prism-react-renderer";
import ReactMarkdown from "react-markdown";
import 'katex/dist/katex.min.css'
import styles from "../styles/Markdown.module.scss";
import theme from 'prism-react-renderer/themes/vsLight';


export interface MarkdownProps {
	value: string;
	className?: string;
}

export const Markdown: FC<MarkdownProps> = props => {

	return <ReactMarkdown
		className={(props.className ?? "") + " " + styles.Markdown}
		remarkPlugins={[remarkGfm, remarkMath]}
		rehypePlugins={[rehypeKatex]}
		components={{
			code({node, inline, className, children, ...props}) {
				const match = /language-(\w+)/.exec(className || '')
				console.log(match);
				return !inline && match ? (
					<Highlight {...defaultProps} theme={theme} code={String(children).replace(/\n$/, '')} language={(match[1] ?? "markup") as Language}>
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
				) : (
					<code className={className} {...props}>
						{children}
					</code>
				)
			},
			a({node, className, children}) {
				// @ts-ignore
				const href = node.properties.href as string;
				return <a target={"_blank"} rel={"noreferrer"} href={href} className={className}>{children}</a>
			}
		}}
	>{props.value}</ReactMarkdown>;

}
