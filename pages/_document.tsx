import Document, { Html, Head, Main, NextScript } from "next/document";
import {useEffect} from "react";

class MyDocument extends Document {

	render() {

		return (
			<Html>
				<Head>
					<link rel="manifest" href="/manifest.json" />
					<link rel="apple-touch-icon" href="/dotmd.png"></link>
					<script async src="/other.js"></script>
					<meta name="theme-color" content="#fff" />
					<title>dotmd</title>
				</Head>
				<body>
				<Main />
				<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;