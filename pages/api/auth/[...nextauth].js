import NextAuth from "next-auth"
import Providers from "next-auth/providers"

const options = {
    providers: [
        Providers.Auth0({
            clientId: process.env.AUTH0_CLIENTID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET
        })
    ]
}

export default (req, res) => NextAuth(req, res, options);