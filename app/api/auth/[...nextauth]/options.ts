import type {NextAuthOptions} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export const authOptions: NextAuthOptions = {
  providers: [
    
    CredentialsProvider({
      name: "existing account",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const {email} = req.body || {};
        
        connectMongoDB();
        const user = await User.findOne({email});        

        if(credentials?.email === user.email && credentials?.password === user.password) {
          return user
        } else {
          return null
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({user,account}) {
      const{name, email} = user
      
      try {
        if(account?.provider === 'google' || 'github') {
          await connectMongoDB();
  
          const userExists = await User.findOne({email});
  
          if(!userExists) {
            await fetch("http://localhost:3000/api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(
                {name, email}
              )
            })
          }
        }
      } catch (error) {
        console.log(error);
        
      }
      return true;
    }
  }
}