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

export interface Markdown2Props {
	value: string;
	className?: string;
	dark: boolean;
}

export interface Markdown2State {
	value: string;
}

export class Markdown2 extends React.Component<Markdown2Props, Markdown2State> {

	public constructor(props: Markdown2Props) {

		super(props);

		this.state = {value: props.value};

	}

	public async setMarkdown(value: string): Promise<void> {
		this.setState({value})
	}

	public render(): React.ReactElement {
		const ppops = this.props
		return <ReactMarkdown
			className={(this.props.className ?? "") + " markdownPreview" + (this.props.dark ? " darkmd" : "")}
			remarkPlugins={[remarkGfm, remarkMath]}
			rehypePlugins={[rehypeKatex]}
			components={{
				code({node, inline, className, children, ...p}) {
					const match = /language-(\w+)/.exec(className || '')
					return !inline && match ? (
						<Highlight {...defaultProps} theme={ppops.dark ? vsDark : vsLight} code={String(children).replace(/\n$/, '')} language={(match[1] ?? "markup") as Language}>
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
						<code className={className} {...ppops}>
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
		>{this.state.value}</ReactMarkdown>;
	}

}