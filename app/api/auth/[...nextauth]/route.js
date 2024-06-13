import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getUser } from "@/app/lib/data";

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        console.log(credentials);
        //get the credentials from the request
        const { username, password } = credentials;
        //get the user from the DB by username
        const user = await getUser(username);

        console.log(user);

        //return null if the user doesn't exist
        if (!user) return null;

        //if there is a user, use bcrypt to compare the provided password against the stored hashed password
        const passwordsMatch = await bcrypt.compare(password, user.password);
        //return true if they match
        if (passwordsMatch) return user;

        //otherwise return null as the provided password does not match
        console.log("invalid credentials");
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user = {
        id: token.user._id,
        username: token.user.username,
      };
      return session;
    },
  },
});

export { handler as GET, handler as POST };
