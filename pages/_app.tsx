import {AppProps} from "next/app";
import { SessionProvider } from "next-auth/react"
import "../styles/globals.scss";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
	return <SessionProvider session={session}>
		<DndProvider backend={HTML5Backend}>
			<Component {...pageProps} />
		</DndProvider>
	</SessionProvider>
}