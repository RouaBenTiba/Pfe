import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: "qsjdhqjskfdshkfjsdg",
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req) {
        try {
          const response = await axios.post("http://localhost:6000/api/login", {
            email: credentials!.email,
            password: credentials!.password,
          });

          const user = response.data;

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          throw new Error("Problème de connexion");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/Log/login",
  },
  debug: true,
};
