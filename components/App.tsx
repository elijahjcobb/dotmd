/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import React, {FC, useState} from "react";
import styles from "../styles/App.module.scss";
import {Editor} from "./Editor";
import {Markdown} from "./Markdown";

export interface AppProps {

}

export const App: FC<AppProps> = props => {

	const [markdown, setMarkdown] = useState(`# header 1
## header 2
### header 3
#### header 4
##### header 5

This is a paragraph... A paragraph can have \`code\` inside of it, but it can also have
functions provided by Latex $y=mx+b$. You can have **bold** text, or *italic* text,
or ~strikethrough~ text. It all works rather nicely.

\`\`\`typescript
function handleSourceCode(): boolean {
    // with syntax highlighting
    return true;
}
\`\`\`

|Col1|Col2|Col3|
---|---|---
|11|12|13|
|21|22|23|
|31|32|33|

[Link to website](google.com)

* so this is good
* this is also good
* ok what about this
    * ok well this one is indented
    * and this one is too
    * so it Thi
* but this one is back to normal

1. here is a numbered list
1. yeah see it keeps going
1. yep more
    * whoa an indent off this one
    * yep
1. and back

**tasks**
- [ ] get this working
- [ ] ok wow cool
- [x] be cool
`);

	function save() {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", '/api/update', true);

//Send the proper header information along with the request
		xhr.setRequestHeader("Content-Type", "application/json");

		xhr.onreadystatechange = function() { // Call a function when the state changes.
			if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
				// Request finished. Do processing here.
			}
		}
		xhr.send(JSON.stringify({
			data: markdown
		}));
	}

	return <div className={styles.App}>
		<div className={styles.header}>
			<span>oafa</span>
			<button onClick={save}>save</button>
		</div>
		<div className={styles.container}>
			<Editor className={styles.editor} value={markdown} setValue={setMarkdown}/>
			<Markdown className={styles.markdown} value={markdown}/>
		</div>
	</div>

}
