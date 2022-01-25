import Document, { Html, Head, Main, NextScript } from "next/document";
import {useEffect} from "react";

class MyDocument extends Document {

	componentDidMount() {

		if('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/service-worker.js');
		}

	};

	render() {

		return (
			<Html>
				<Head>
					<link rel="manifest" href="/manifest.json" />
					<link rel="apple-touch-icon" href="/oofa.png"></link>
					<meta name="theme-color" content="#fff" />
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