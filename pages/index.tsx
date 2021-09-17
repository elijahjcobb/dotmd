import type { NextPage } from 'next'

import ReactMarkdown from "react-markdown";
import Editor from "@monaco-editor/react";
import {useState} from "react";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import 'katex/dist/katex.min.css'

import Highlight, { defaultProps } from "prism-react-renderer";


const Home: NextPage = () => {

	const [markdown, setMarkdown] = useState("");

	return <div>
		<Editor
			height="50vh"
			theme="vs-dark"
			defaultLanguage="markdown"
			defaultValue="// some comment"
			value={markdown}
			onChange={(value, ev) => setMarkdown(value ?? "")}
		/>
		<ReactMarkdown
			remarkPlugins={[remarkGfm, remarkMath]}
			rehypePlugins={[rehypeKatex]}
			components={{
				code({node, inline, className, children, ...props}) {
					const match = /language-(\w+)/.exec(className || '')
					return !inline && match ? (
						<Highlight {...defaultProps} code={String(children).replace(/\n$/, '')} language={"typescript"}>
							{({ className, style, tokens, getLineProps, getTokenProps }) => (
								<pre className={className} style={style}>{tokens.map((line, i) => (
									<div {...getLineProps({ line, key: i })}>
										{line.map((token, key) => (
											<span {...getTokenProps({ token, key })} />
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
				}
			}}
		>{markdown}</ReactMarkdown>
	</div>
}

export default Home
