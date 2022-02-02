/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import * as Crypto from "crypto";


export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
		})
		// ...add more providers here
	],
	//secret: process.env.SECRET as string
})