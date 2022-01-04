import NextAuth from "next-auth"
import Providers from "next-auth/providers"

const options = {
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        // Providers.Auth0({
        //     clientId: process.env.AUTH0_CLIENTID,
        //     clientSecret: process.env.AUTH0_CLIENT_SECRET,
        //     issuer: process.env.AUTH0_DOMAIN
        // })
    ]
}

export default (req, res) => NextAuth(req, res, options);